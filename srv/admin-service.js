const cds = require('@sap/cds')

module.exports = class AdminService extends cds.ApplicationService { init() {

  const { Books } = this.entities

  /**
   * Generate IDs for new Books drafts
   */
  this.before ('NEW', Books.drafts, async (req) => {
    if (req.data.ID != null) return

    const [books, drafts] = await Promise.all([
      SELECT.from(Books).columns('ID'),
      SELECT.from(Books.drafts).columns('ID')
    ])
    let maxID = 0
    for (const { ID } of [...books, ...drafts]) {
      if (ID == null || String(ID).trim() === '') {
        return req.error(500, 'Cannot generate a numeric book ID from an empty ID')
      }
      const numericID = Number(ID)
      if (!Number.isSafeInteger(numericID) || numericID < 0) {
        return req.error(500, `Cannot generate a numeric book ID from "${ID}"`)
      }
      maxID = Math.max(maxID, numericID)
    }
    if (maxID >= Number.MAX_SAFE_INTEGER) {
      return req.error(500, 'Cannot generate a book ID beyond the maximum safe integer')
    }
    req.data.ID = String(maxID + 1)
  })
  this.after('READ', Books, (books) => {
    if (Array.isArray(books)) {
      for (const book of books) {
        book.printVisible = book.status === 'Approved'
      }
    } else if (books) {
      books.printVisible = books.status === 'Approved'
    }
  })
  this.on('request_trigger_wf', Books, async (req) => {
      const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
      console.log('executeHttpRequest is successfult got')
      const { ID } = req.data
      const book = await SELECT.one.from(Books).where({ ID })
        .columns('authorName', 'currencyCode', 'descr', 'price', 'stock', 'title')
      if (!book) return req.error(404, `Book #${ID} does not exist`)
      console.log('Submitting book to workflow engine:', book)
      const res = await executeHttpRequest(
        { destinationName: 'process_automation_cap2bpa' },
        {
          method: 'POST',
          url: '/v1/workflow-instances',
          data: {
            definitionId: 'us10.bd31c2a7trial.wfcap1.wfcap1',
            context: {
              author: book.authorName,
              currency: book.currencyCode,
              desc: book.descr,
              id: ID,
              price: book.price,
              stock: book.stock,
              title: book.title
            }
        }
      },
      );
      console.log('Workflow engine response:', res)
      return res;
    })
  this.on('annotation_trigger_wf', Books, async req => req.subject)
  return super.init()
}}
