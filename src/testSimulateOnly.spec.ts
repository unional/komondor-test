import t from 'assert'

import { testSimulateOnly } from '.'

testSimulateOnly('simulateOnly', async spec => {
  const s = await spec(() => {
    throw new Error('should not run')
  })

  t.equal(s.subject(), 'foo')

  await s.satisfy([])
})

testSimulateOnly('custom description', 'simulateOnlyCustom', async spec => {
  const s = await spec(() => {
    throw new Error('should not run')
  })

  t.equal(s.subject(), 'foo')

  await s.satisfy([])
})

test('not run with only defined', () => {
  throw new Error('should not run')
})
