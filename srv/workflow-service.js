const cds = require('@sap/cds')

module.exports = class AdminService extends cds.ApplicationService { init() {

  const { Books } = this.entities

  /**
   * Generate IDs for new Books drafts
   */
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