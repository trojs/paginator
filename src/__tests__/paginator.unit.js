import Paginator from '../paginator.js'

const TestCases = [
  {
    description: 'It should return the first page with 2 items',
    items: [1, 2, 3, 4, 5],
    page: 0,
    size: 2,
    url: '/',
    expectedResult: {
      _links: {
        self: '/?size=2&page=0',
        prev: null,
        next: '/?size=2&page=1'
      },
      count: 5,
      size: 2,
      page: 0,
      pages: 3,
      result: [1, 2]
    }
  },
  {
    description: 'It should return the second page with 2 items',
    items: [1, 2, 3, 4, 5],
    page: 1,
    size: 2,
    url: '/',
    expectedResult: {
      _links: {
        self: '/?size=2&page=1',
        prev: '/?size=2&page=0',
        next: '/?size=2&page=2'
      },
      count: 5,
      size: 2,
      page: 1,
      pages: 3,
      result: [3, 4]
    }
  },
  {
    description: 'It should return the last page with 1 item',
    items: [1, 2, 3, 4, 5],
    page: 2,
    size: 2,
    url: '/',
    expectedResult: {
      _links: {
        self: '/?size=2&page=2',
        prev: '/?size=2&page=1',
        next: null
      },
      count: 5,
      size: 2,
      page: 2,
      pages: 3,
      result: [5]
    }
  },
  {
    description:
            'It should return the second page with 2 items and no next',
    items: [1, 2, 3, 4],
    page: 1,
    size: 2,
    url: '/',
    expectedResult: {
      _links: {
        self: '/?size=2&page=1',
        prev: '/?size=2&page=0',
        next: null
      },
      count: 4,
      size: 2,
      page: 1,
      pages: 2,
      result: [3, 4]
    }
  },
  {
    description: 'It should return null for prev and next',
    items: [1],
    page: 0,
    size: 2,
    url: '/',
    expectedResult: {
      _links: {
        self: '/?size=2&page=0',
        prev: null,
        next: null
      },
      count: 1,
      size: 2,
      page: 0,
      pages: 1,
      result: [1]
    }
  },
  {
    description: 'It should return null for prev and next and self',
    items: [1],
    page: 0,
    size: 2,
    url: null,
    expectedResult: {
      _links: {
        self: null,
        prev: null,
        next: null
      },
      count: 1,
      size: 2,
      page: 0,
      pages: 1,
      result: [1]
    }
  },
  {
    description: 'It should use page 0 and size 10 by default',
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    page: null,
    size: null,
    url: '/?test=true',
    expectedResult: {
      _links: {
        self: '/?test=true&size=10&page=0',
        prev: null,
        next: '/?test=true&size=10&page=1'
      },
      count: 11,
      size: 10,
      page: 0,
      pages: 2,
      result: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
]

describe.each(TestCases)(
  'Paginator helper',
  ({ description, items, page, size, url, expectedResult }) => {
    it(description, () => {
      const results = Paginator({
        items,
        page,
        size,
        url
      })

      expect(results.data).toEqual(expectedResult)
    })
  }
)

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
    expectedResult: 'page is not a valid number'
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
  }
]

describe.each(ErrorTestCases)(
  'test paginator validation',
  ({ description, props, expectedResult }) => {
    it(description, () => {
      expect(() => Paginator(props)).toThrowError(expectedResult)
    })
  }
)
