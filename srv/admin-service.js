const cds = require('@sap/cds')

module.exports = class AdminService extends cds.ApplicationService { init() {

  const { Books } = this.entities

  /**
   * Generate IDs for new Books drafts
   */
  this.before ('NEW', Books.drafts, async (req) => {
    if (req.data.ID) return
    const { ID:id1 } = await SELECT.one.from(Books).columns('max(ID) as ID')
    const { ID:id2 } = await SELECT.one.from(Books.drafts).columns('max(ID) as ID')
    req.data.ID = Math.max(id1||0, id2||0) + 1
  })
  this.on('submit', Books, async (req) => {
      const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
      console.log('executeHttpRequest is successfult got')
      const { ID } = req.data
      const book = await SELECT.one.from(Books).where({ ID })
        .columns('authorName', 'currencyCode', 'descr', 'idStr', 'price', 'stock', 'title')
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
              id: book.idStr,
              price: book.price,
              stock: book.stock,
              title: book.title
            }
        }
      },
      { fetchCsrfToken: false }
      );
      console.log('Workflow engine response:', res)
      return res;
    })
  this.on('ApproveBooks', Books, async req => {
    const { ID } = req.data
    if (ID == null) return req.error(400, 'ID is required')

    const book = await SELECT.one.from(Books).where({ ID }).columns('ID')
    if (!book) return req.error(404, `Book #${ID} does not exist`)

    await UPDATE(Books, ID).with({ status: 'Approved' })
  })
  this.on('RejectBooks', Books, async req => {
    const { ID } = req.data
    if (ID == null) return req.error(400, 'ID is required')

    const book = await SELECT.one.from(Books).where({ ID }).columns('ID')
    if (!book) return req.error(404, `Book #${ID} does not exist`)

    await UPDATE(Books, ID).with({ status: 'Rejected' })
  })
  return super.init()
}}
