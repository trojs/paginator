import test from 'node:test'
import assert from 'node:assert'
import { Paginator } from '../paginator.js'

/* eslint sonarjs/no-duplicate-string: "off" */

const TestCases = [
    {
        description: 'It should handle an empty array',
        items: [],
        page: 0,
        size: 2,
        url: 'https://hckr.news/',
        count: null,
        sortColumn: null,
        sortDirection: null,
        expectedResult: {
            cursors: {
                self: 'https://hckr.news/?size=2&page=0',
                prev: null,
                next: null,
                first: null,
                last: null
            },
            count: 0,
            size: 2,
            page: 0,
            pages: 0,
            items: []
        }
    },
    {
        description: 'It should return the first page with 2 items',
        items: [1, 2, 3, 4, 5],
        page: 0,
        size: 2,
        url: 'https://hckr.news/',
        count: null,
        sortColumn: null,
        sortDirection: null,
        expectedResult: {
            cursors: {
                self: 'https://hckr.news/?size=2&page=0',
                prev: null,
                next: 'https://hckr.news/?size=2&page=1',
                first: 'https://hckr.news/?size=2&page=0',
                last: 'https://hckr.news/?size=2&page=2'
            },
            count: 5,
            size: 2,
            page: 0,
            pages: 3,
            items: [1, 2]
        }
    },
    {
        description: 'It should return the second page with 2 items',
        items: [1, 2, 3, 4, 5],
        page: 1,
        size: 2,
        url: 'https://hckr.news/',
        count: null,
        sortColumn: null,
        sortDirection: null,
        expectedResult: {
            cursors: {
                self: 'https://hckr.news/?size=2&page=1',
                prev: 'https://hckr.news/?size=2&page=0',
                next: 'https://hckr.news/?size=2&page=2',
                first: 'https://hckr.news/?size=2&page=0',
                last: 'https://hckr.news/?size=2&page=2'
            },
            count: 5,
            size: 2,
            page: 1,
            pages: 3,
            items: [3, 4]
        }
    },
    {
        description: 'It should return the last page with 1 item',
        items: [1, 2, 3, 4, 5],
        page: 2,
        size: 2,
        url: 'https://hckr.news/',
        count: null,
        sortColumn: null,
        sortDirection: null,
        expectedResult: {
            cursors: {
                self: 'https://hckr.news/?size=2&page=2',
                prev: 'https://hckr.news/?size=2&page=1',
                next: null,
                first: 'https://hckr.news/?size=2&page=0',
                last: 'https://hckr.news/?size=2&page=2'
            },
            count: 5,
            size: 2,
            page: 2,
            pages: 3,
            items: [5]
        }
    },
    {
        description:
            'It should return the second page with 2 items and no next',
        items: [1, 2, 3, 4],
        page: 1,
        size: 2,
        url: 'https://hckr.news/',
        count: null,
        sortColumn: null,
        sortDirection: null,
        expectedResult: {
            cursors: {
                self: 'https://hckr.news/?size=2&page=1',
                prev: 'https://hckr.news/?size=2&page=0',
                next: null,
                first: 'https://hckr.news/?size=2&page=0',
                last: 'https://hckr.news/?size=2&page=1'
            },
            count: 4,
            size: 2,
            page: 1,
            pages: 2,
            items: [3, 4]
        }
    },
    {
        description: 'It should return null for prev and next',
        items: [1],
        page: 0,
        size: 2,
        url: 'https://hckr.news/',
        count: null,
        sortColumn: null,
        sortDirection: null,
        expectedResult: {
            cursors: {
                self: 'https://hckr.news/?size=2&page=0',
                prev: null,
                next: null,
                first: 'https://hckr.news/?size=2&page=0',
                last: 'https://hckr.news/?size=2&page=0'
            },
            count: 1,
            size: 2,
            page: 0,
            pages: 1,
            items: [1]
        }
    },
    {
        description: 'It should return null for prev and next and self',
        items: [1],
        page: 0,
        size: 2,
        url: null,
        count: null,
        sortColumn: null,
        sortDirection: null,
        expectedResult: {
            cursors: {
                self: null,
                prev: null,
                next: null,
                first: null,
                last: null
            },
            count: 1,
            size: 2,
            page: 0,
            pages: 1,
            items: [1]
        }
    },
    {
        description: 'It should use page 0 and size 10 by default',
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        page: null,
        size: null,
        url: 'https://hckr.news/?test=true',
        count: null,
        sortColumn: null,
        sortDirection: null,
        expectedResult: {
            cursors: {
                self: 'https://hckr.news/?test=true&size=10&page=0',
                prev: null,
                next: 'https://hckr.news/?test=true&size=10&page=1',
                first: 'https://hckr.news/?test=true&size=10&page=0',
                last: 'https://hckr.news/?test=true&size=10&page=1'
            },
            count: 11,
            size: 10,
            page: 0,
            pages: 2,
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    },
    {
        description: 'It should use a custom count',
        items: [3, 4],
        page: 2,
        size: 2,
        url: 'https://hckr.news/?test=true',
        count: 20,
        sortColumn: null,
        sortDirection: null,
        expectedResult: {
            cursors: {
                self: 'https://hckr.news/?test=true&size=2&page=2',
                prev: 'https://hckr.news/?test=true&size=2&page=1',
                next: 'https://hckr.news/?test=true&size=2&page=3',
                first: 'https://hckr.news/?test=true&size=2&page=0',
                last: 'https://hckr.news/?test=true&size=2&page=9'
            },
            count: 20,
            size: 2,
            page: 2,
            pages: 10,
            items: [3, 4]
        }
    },
    {
        description: 'It should sort the items',
        items: [
            { id: 1, test: 'a' },
            { id: 2, test: 'b' },
            { id: 3, test: 'c' },
            { id: 4, test: 'd' },
            { id: 5, test: 'e' }
        ],
        page: 1,
        size: 2,
        url: 'https://hckr.news/?test=true',
        count: null,
        sortColumn: 'id',
        sortDirection: 'desc',
        expectedResult: {
            cursors: {
                self: 'https://hckr.news/?test=true&size=2&page=1',
                prev: 'https://hckr.news/?test=true&size=2&page=0',
                next: 'https://hckr.news/?test=true&size=2&page=2',
                first: 'https://hckr.news/?test=true&size=2&page=0',
                last: 'https://hckr.news/?test=true&size=2&page=2'
            },
            count: 5,
            size: 2,
            page: 1,
            pages: 3,
            items: [
                { id: 3, test: 'c' },
                { id: 2, test: 'b' }
            ]
        }
    }
]

test('Paginator helper', async (t) => {
    await Promise.all(TestCases.map(async (testCase) => {
        await t.test(testCase.description, async () => {
            const results = Paginator({
                items: testCase.items,
                page: testCase.page,
                size: testCase.size,
                url: testCase.url,
                count: testCase.count,
                sortColumn: testCase.sortColumn,
                sortDirection: testCase.sortDirection
            })

            assert.deepEqual(results.data, testCase.expectedResult)
        })
    }))
})

const ErrorTestCases = [
    {
        description: 'It should throw an error if the items arent an array',
        props: {
            items: null
        },
        expectedResult: 'items is not an array'
    },
    {
        description: 'It should throw an error if the items arent an array',
        props: {
            items: 1
        },
        expectedResult: 'items is not an array'
    },
    {
        description: 'It should throw an error if the page is not a number',
        props: {
            items: [],
            page: 'a'
        },
        expectedResult: 'page is not a number'
    },
    {
        description:
            'It should throw an error if the page number is to high or low',
        props: {
            items: [],
            page: 2
        },
        expectedResult: 'page is not a valid number'
    },
    {
        description: 'It should throw an error if the size is not a number',
        props: {
            items: [],
            size: 'a'
        },
        expectedResult: 'size is not a valid positive number'
    },
    {
        description: 'It should throw an error if the url is not a string',
        props: {
            items: [],
            url: 1
        },
        expectedResult: 'url is not a valid string'
    },
    {
        description: 'It should throw an error if the sort column is not a string',
        props: {
            items: [{ id: 1 }],
            sortDirection: 'asc',
            sortColumn: 42
        },
        expectedResult: 'sortColumn is not a valid string'
    },
    {
        description: 'It should throw an error if the sort direction is not a valid sort direction',
        props: {
            items: [{ id: 1 }],
            sortDirection: 'test',
            sortColumn: 'id'
        },
        expectedResult: 'Invalid SortDirection key test'
    }
]

test('test paginator validation', async (t) => {
    await Promise.all(ErrorTestCases.map(async (testCase) => {
        await t.test(testCase.description, async () => {
            try {
                Paginator(testCase.props)
            } catch (error) {
                assert.equal(error.message, testCase.expectedResult)
            }
        })
    }))
})
