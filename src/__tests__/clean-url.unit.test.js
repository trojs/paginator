import test from 'node:test'
import assert from 'node:assert'
import { cleanUrl } from '../clean-url.js'

test('Clean URL helper', async (t) => {
    await t.test('It should work with a simple url', () => {
        const request = {
            protocol: 'https',
            get: () => 'hckr.news',
            originalUrl: '/product'
        }
        const url = `${request.protocol}://${request.get('Host')}${request.originalUrl}`
        const result = cleanUrl(url)
        const expectedResult = 'https://hckr.news/product'
        assert.equal(result, expectedResult)
    })

    await t.test('It should return url without page and size', () => {
        const request = {
            protocol: 'https',
            get: () => 'hckr.news',
            originalUrl: '/product?itemnumber=G4341&supplier=ProductItemBrand.Me&size=2&page=1'
        }
        const url = `${request.protocol}://${request.get('Host')}${request.originalUrl}`
        const result = cleanUrl(url)
        const expectedResult = 'https://hckr.news/product?itemnumber=G4341&supplier=ProductItemBrand.Me'
        assert.equal(result, expectedResult)
    })
})
