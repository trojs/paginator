import { Arr } from '@hckrnews/arrays'
import { SortDirection } from './enums/sort-direction.js'
import { cleanUrl } from './clean-url.js'

/**
 * The paginator.
 */
class Paginator {
  constructor () {
    this.items = []
    this.page = 0
    this.size = 10
    this.url = null
    this.sortColumn = null
    this.sortDirection = null
  }

  /**
   * Get the total of pages.
   * @returns {number}
   */
  get pages () {
    return Math.ceil(this.total / this.size)
  }

  /**
   * Get the previous page.
   * @returns {number}
   */
  get prev () {
    return this.page > 0 ? this.page - 1 : null
  }

  /**
   * Get the last page.
   * @returns {number}
   */
  get last () {
    return this.pages - 1
  }

  /**
   * Get the next page.
   * @returns {number}
   */
  get next () {
    return this.page !== null && this.end < this.total
      ? this.page + 1
      : null
  }

  /**
   * Get the start item index.
   * @returns {number}
   */
  get start () {
    return this.page * this.size
  }

  /**
   * Get the end item index.
   * @returns {number}
   */
  get end () {
    return this.start + this.size
  }

  /**
   * Get the items sorted.
   * @returns {object[]}
   */
  get sortedItems () {
    if (!this.sortColumn || !this.sortDirection) {
      return this.items
    }

    return new Arr(this.items).multisort(this.sortColumn, this.sortDirection)
  }

  /**
   * Get the current items.
   * @returns {object[]}
   */
  get current () {
    return this.count ? this.sortedItems : this.sortedItems.slice(this.start, this.end)
  }

  /**
   * Get the total items.
   * @returns {number}
   */
  get total () {
    return this.count ?? this.items.length
  }

  /**
   * Get the connector in the url.
   * @returns {string}
   */
  get connectorUrl () {
    return this.url &&
            (this.url.includes('&') ||
                (this.url.includes('?') && !this.url.includes('&')))
      ? '&'
      : '?'
  }

  /**
   * Get the next page url
   * @returns {string}
   */
  get nextPage () {
    return this.url && this.next !== null
      ? `${this.url}${this.connectorUrl}size=${this.size}&page=${this.next}`
      : null
  }

  /**
   * Get the current page url
   * @returns {string}
   */
  get currentPage () {
    return this.url && this.page !== null
      ? `${this.url}${this.connectorUrl}size=${this.size}&page=${this.page}`
      : null
  }

  /**
   * Get the previous page url
   * @returns {string}
   */
  get prevPage () {
    return this.url && this.prev !== null
      ? `${this.url}${this.connectorUrl}size=${this.size}&page=${this.prev}`
      : null
  }

  /**
   * Get the first page url
   * @returns {string}
   */
  get firstPage () {
    return this.url && this.total > 0
      ? `${this.url}${this.connectorUrl}size=${this.size}&page=0`
      : null
  }

  /**
   * Get the first page url
   * @returns {string}
   */
  get lastPage () {
    return this.url && this.total > 0
      ? `${this.url}${this.connectorUrl}size=${this.size}&page=${this.last}`
      : null
  }

  /**
   * Get the pagination data
   * @typedef {{ self: string, prev: string, next: string, first: string, last: string }} Links
   * @returns {{ cursors: Links, count: number, pages: number, size: number, page: number, items: object[] }}
   */
  get data () {
    return {
      cursors: {
        self: this.currentPage,
        prev: this.prevPage,
        next: this.nextPage,
        first: this.firstPage,
        last: this.lastPage
      },
      count: this.total,
      pages: this.pages,
      size: this.size,
      page: this.page,
      items: this.current
    }
  }

  /**
   * Set the items
   * @param {object[]} items
   */
  setItems (items) {
    if (items === null || items.constructor.name !== 'Array') {
      throw new TypeError('items is not an array')
    }

    this.items = items
  }

  /**
   * Check if the page is valid.
   * @param {number} page
   * @returns {boolean}
   */
  isValidPage (page) {
    return (page < this.pages && page >= 0) || (page === 0 && this.pages === 0)
  }

  /**
   * Set the page
   * @param {number} page
   */
  setPage (page) {
    if (page !== null && page.constructor.name !== 'Number') {
      throw new TypeError('page is not a number')
    }

    if (page !== null && !this.isValidPage(page)) {
      throw new RangeError('page is not a valid number')
    }

    this.page = page || this.page
  }

  /**
   * Set the page size
   * @param {number} size
   */
  setSize (size) {
    if (size !== null && (size.constructor.name !== 'Number' || size < 1)) {
      throw new TypeError('size is not a valid positive number')
    }

    this.size = size || this.size
  }

  /**
   * Set the url
   * @param {string} url
   */
  setUrl (url) {
    if (url !== null && url.constructor.name !== 'String') {
      throw new TypeError('url is not a valid string')
    }

    this.url = url ? cleanUrl(url) : this.url
  }

  /**
   * Set the sortColumn
   * @param {string} sortColumn
   */
  setSortColumn (sortColumn) {
    if (sortColumn !== null && sortColumn.constructor.name !== 'String') {
      throw new TypeError('sortColumn is not a valid string')
    }

    this.sortColumn = sortColumn || this.sortColumn
  }

  /**
   * Set the sortDirection
   * @param {string} sortDirection
   */
  setSortDirection (sortDirection) {
    this.sortDirection = sortDirection !== null
      ? SortDirection.fromKey(sortDirection).key
      : this.sortDirection
  }

  /**
   * Set the count
   * @param {number} count
   */
  setCount (count) {
    if (count) {
      this.count = count
    }
  }
}

/**
 * Create Pagination with the paginator builder
 * @param {object} data
 * @param {object[]} data.items
 * @param {number=} data.page
 * @param {number=} data.size
 * @param {string=} data.url
 * @param {number=} data.count
 * @param {string=} data.sortColumn
 * @param {string=} data.sortDirection
 * @returns {Paginator}
 */
const PaginatorBuilder = ({
  items,
  page = null,
  size = null,
  url = null,
  count = null,
  sortColumn = null,
  sortDirection = null
}) => {
  const paginator = new Paginator()

  paginator.setCount(count)
  paginator.setItems(items)
  paginator.setSize(size)
  paginator.setPage(page)
  paginator.setUrl(url)
  paginator.setSortColumn(sortColumn)
  paginator.setSortDirection(sortDirection)

  return paginator
}

export { PaginatorBuilder as Paginator }
