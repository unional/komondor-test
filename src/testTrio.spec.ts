import t from 'assert'
import { AssertOrder } from 'assertron'
import fs from 'fs'

import { testLive, testSave, testSimulate, testTrio } from '.'


testTrio('trio', async spec => {
  const s = await spec(() => {
    return 'foo'
  })

  t.equal(s.subject(), 'foo')

  await s.satisfy([])
  t(fs.existsSync('__komondor__/specs/trio.json') === true)
})

testTrio('custom description', 'trioCustom', async spec => {
  const s = await spec(() => {
    return 'foo'
  })

  t.equal(s.subject(), 'foo')

  await s.satisfy([])
  t(fs.existsSync('__komondor__/specs/trioCustom.json') === true)
})

testLive('liveOnly', async spec => {
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

testLive('custom description', 'liveOnlyCustom', async spec => {
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

testSave('save', async spec => {
  const o = new AssertOrder(1)
  const s = await spec(() => {
    o.once(1)
    return 'foo'
  })

  t.equal(s.subject(), 'foo')

  await s.satisfy([])
  t(fs.existsSync('__komondor__/specs/save.json') === true)
  o.end()
})

testSave('custom description', 'saveCustom', async spec => {
  const o = new AssertOrder(1)
  const s = await spec(() => {
    o.once(1)
    return 'foo'
  })

  t.equal(s.subject(), 'foo')

  await s.satisfy([])
  t(fs.existsSync('__komondor__/specs/saveCustom.json') === true)
  o.end()
})

testSimulate('simulate', async spec => {
  const s = await spec(() => {
    throw new Error('should not run')
  })

  t.equal(s.subject(), 'foo')

  await s.satisfy([])
})

testSimulate('custom description', 'simulateCustom', async spec => {
  const s = await spec(() => {
    throw new Error('should not run')
  })

  t.equal(s.subject(), 'foo')

  await s.satisfy([])
})
