import test from 'node:test'
import assert from 'node:assert'
import { SortDirection } from '../sort-direction.js'

test('Test the sortDirection enum', async (t) => {
  await t.test('It should create from a key', async () => {
    const sortDirection = SortDirection.fromKey('asc')
    assert.strictEqual(sortDirection.key, 'asc')
    assert.strictEqual(sortDirection.value, 'asc')
    assert.deepEqual(sortDirection.values, ['asc', 'desc'])
    assert.deepEqual(SortDirection.options, {
      asc: 'asc',
      desc: 'desc'
    })
    assert.deepEqual(sortDirection.keys, ['asc', 'desc'])
    assert.strictEqual(sortDirection.asc, 'asc')
    assert.strictEqual(sortDirection.length, 2)
  })

  await t.test('It should create from an value', async () => {
    const sortDirection = SortDirection.fromValue('asc')
    assert.strictEqual(sortDirection.key, 'asc')
    assert.strictEqual(sortDirection.value, 'asc')
    assert.deepEqual(sortDirection.values, ['asc', 'desc'])
    assert.deepEqual(SortDirection.options, {
      asc: 'asc',
      desc: 'desc'
    })
    assert.deepEqual(sortDirection.keys, ['asc', 'desc'])
    assert.strictEqual(sortDirection.asc, 'asc')
    assert.strictEqual(sortDirection.length, 2)
  })

  await t.test('It should work with the static methods', async () => {
    assert.strictEqual(SortDirection.hasKey('asc'), true)
    assert.strictEqual(SortDirection.hasKey('ASC'), false)
    assert.strictEqual(SortDirection.hasValue('asc'), true)
    assert.strictEqual(SortDirection.hasValue('ASC'), false)
  })

  await t.test('It should throw an exception for an unknown key', async () => {
    try {
      SortDirection.fromKey('ASC')
    } catch (error) {
      assert.strictEqual(error.message, 'Invalid SortDirection key ASC')
    }
  })

  await t.test('It should throw an exception for an unknown value', async () => {
    try {
      SortDirection.fromValue('ASC')
    } catch (error) {
      assert.strictEqual(error.message, 'Invalid SortDirection value ASC')
    }
  })
})
