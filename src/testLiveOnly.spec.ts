import t from 'assert'
import { AssertOrder } from 'assertron'
import fs from 'fs'

import { testLiveOnly } from '.'

testLiveOnly('liveOnly', async spec => {
  const o = new AssertOrder(1)
  const s = await spec(() => {
    o.once(1)
    return 'foo'
  })

  t.equal(s.subject(), 'foo')

  await s.satisfy([])
  t(fs.existsSync('__komondor__/specs/liveOnly.json') === false)
  o.end()
})

testLiveOnly('custom description', 'liveOnlyCustom', async spec => {
  const o = new AssertOrder(1)
  const s = await spec(() => {
    o.once(1)
    return 'foo'
  })

  t.equal(s.subject(), 'foo')

  await s.satisfy([])
  t(fs.existsSync('__komondor__/specs/liveOnlyCustom.json') === false)
  o.end()
})

test('not run with only defined', () => {
  throw new Error('should not run')
})
