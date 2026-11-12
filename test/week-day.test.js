const assert = require('node:assert/strict')
const { before, after, test } = require('node:test')
const cds = require('@sap/cds')

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let server, baseUrl, model

before(async () => {
  cds.env.requires.auth = { kind: 'dummy' }
  cds.env.requires.db = { kind: 'sqlite', credentials: { url: ':memory:' } }
  server = await cds.server({ port: 0, service: 'CatalogService', in_memory: true })
  model = cds.model
  baseUrl = `http://127.0.0.1:${server.address().port}/odata/v4/catalog`
})

after(async () => {
  if (server) await new Promise((resolve, reject) => {
    server.close(error => error ? reject(error) : resolve())
  })
  if (cds.db) await cds.db.disconnect()
})

async function selectDay(id, data) {
  return fetch(`${baseUrl}/Books('${id}')/CatalogService.testWeekDay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

test('exposes an Object Page action with a required, fixed-value weekday dropdown', () => {
  const books = model.definitions['CatalogService.Books']
  const action = books.actions.testWeekDay
  const parameter = action.params.weekDay
  assert.equal(books['@UI.HeaderInfo.Title.Value']['='], 'headerTitle')
  assert.ok(books['@UI.Identification'].some(item =>
    item.Action === 'CatalogService.testWeekDay'
  ))
  assert.equal(parameter['@mandatory'], true)
  assert.equal(parameter['@Common.ValueListWithFixedValues'], true)
  assert.equal(parameter['@Common.ValueList.CollectionPath'], 'WeekDays')
  assert.equal(parameter['@Common.ValueList.Parameters'][0].LocalDataProperty['='], 'weekDay')
  assert.deepEqual(action['@Common.SideEffects.TargetProperties'], ['in/weekDay', 'in/headerTitle'])
})

test('provides exactly Sunday through Saturday in calendar order', async () => {
  const response = await fetch(`${baseUrl}/WeekDays?$orderby=order&$select=code`)
  assert.equal(response.status, 200)
  assert.deepEqual((await response.json()).value.map(day => day.code), days)
})

test('initially keeps the existing book title as the header', async () => {
  const response = await fetch(`${baseUrl}/Books('207')`)
  assert.equal(response.status, 200)
  const book = await response.json()
  assert.equal(book.weekDay, null)
  assert.equal(book.headerTitle, book.title)
})

test('persists each weekday and updates the header without changing book titles', async () => {
  const original = await cds.db.read('sap.capire.bookshop.Books', '207')
  for (const weekDay of days) {
    const response = await selectDay('207', { weekDay })
    assert.equal(response.status, 200)
    const result = await response.json()
    assert.equal(result.weekDay, weekDay)
    assert.equal(result.headerTitle, `您输入的是${weekDay}`)
    assert.equal(result.title, original.title)

    const refreshed = await fetch(`${baseUrl}/Books('207')?$select=headerTitle,weekDay,title`)
    const book = await refreshed.json()
    assert.equal(book.headerTitle, `您输入的是${weekDay}`)
    assert.equal(book.weekDay, weekDay)
    assert.equal(book.title, original.title)
    assert.equal((await cds.db.read('sap.capire.bookshop.Books', '207')).weekDay, weekDay)
  }
  const other = await (await fetch(`${baseUrl}/Books('251')`)).json()
  assert.equal(other.weekDay, null)
  assert.equal(other.headerTitle, other.title)
})

test('rejects invalid or missing weekdays without changing the saved selection', async () => {
  for (const data of [{}, { weekDay: null }, { weekDay: '' }, { weekDay: 'Funday' }, { weekDay: 'monday' }]) {
    const response = await selectDay('207', data)
    assert.equal(response.status, 400, JSON.stringify(data))
  }
  const book = await cds.db.read('sap.capire.bookshop.Books', '207')
  assert.equal(book.weekDay, 'Saturday')
})

test('rejects missing and unapproved books without updating them', async () => {
  for (const id of ['does-not-exist', '201']) {
    const response = await selectDay(id, { weekDay: 'Monday' })
    assert.equal(response.status, 404)
  }
  assert.equal((await cds.db.read('sap.capire.bookshop.Books', '201')).weekDay, null)
})

test('keeps catalog books read-only outside the action', async () => {
  const response = await fetch(`${baseUrl}/Books('207')`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ weekDay: 'Monday' })
  })
  assert.equal(response.status, 405)
})
