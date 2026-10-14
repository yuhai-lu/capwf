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
      // console.log(req)
      return req.subject
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
