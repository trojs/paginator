/**
 * The paginator.
 */
class Paginator {
    constructor() {
        this.items = [];
        this.page = 0;
        this.size = 10;
        this.url = null;
    }

    /**
     * Get the total of pages.
     *
     * @return {number}
     */
    get pages() {
        return Math.ceil(this.total / this.size);
    }

    /**
     * Get the previous page.
     *
     * @return {number}
     */
    get prev() {
        return this.page > 0 ? this.page - 1 : null;
    }

    /**
     * Get the next page.
     *
     * @return {number}
     */
    get next() {
        return this.page !== null && this.end < this.total
            ? this.page + 1
            : null;
    }

    /**
     * Get the start item index.
     *
     * @return {number}
     */
    get start() {
        return this.page * this.size;
    }

    /**
     * Get the end item index.
     *
     * @return {number}
     */
    get end() {
        return this.start + this.size;
    }

    /**
     * Get the current items.
     *
     * @return {array}
     */
    get current() {
        return this.count ? this.items : this.items.slice(this.start, this.end);
    }

    /**
     * Get the total items.
     *
     * @return {number}
     */
    get total() {
        return this.count ?? this.items.length;
    }

    /**
     * Get the connector in the url.
     *
     * @return {string}
     */
    get connectorUrl() {
        return this.url &&
            (this.url.includes('&') ||
                (this.url.includes('?') && !this.url.includes('&')))
            ? '&'
            : '?';
    }

    /**
     * Get the next page url
     *
     * @return {string}
     */
    get nextPage() {
        return this.url && this.next !== null
            ? `${this.url}${this.connectorUrl}size=${this.size}&page=${this.next}`
            : null;
    }

    /**
     * Get the current page url
     *
     * @return {string}
     */
    get currentPage() {
        return this.url && this.page !== null
            ? `${this.url}${this.connectorUrl}size=${this.size}&page=${this.page}`
            : null;
    }

    /**
     * Get the previous page url
     *
     * @return {string}
     */
    get prevPage() {
        return this.url && this.prev !== null
            ? `${this.url}${this.connectorUrl}size=${this.size}&page=${this.prev}`
            : null;
    }

    /**
     * Get the pagination data
     *
     * @return {object}
     */
    get data() {
        return {
            _links: {
                self: this.currentPage,
                prev: this.prevPage,
                next: this.nextPage,
            },
            count: this.total,
            pages: this.pages,
            size: this.size,
            page: this.page,
            result: this.current,
        };
    }

    /**
     * Set the items
     *
     * @param {array} items
     */
    setItems(items) {
        if (items === null || items.constructor.name !== 'Array') {
            throw new TypeError('items is not an array');
        }
        this.items = items;
    }

    /**
     * Check if the page is valid.
     *
     * @param {number} page
     *
     * @return {boolean}
     */
    isValidPage(page) {
        return (
            (page < this.pages && page >= 0) || (page === 0 && this.pages === 0)
        );
    }

    /**
     * Set the page
     *
     * @param {number} page
     */
    setPage(page) {
        if (page !== null && page.constructor.name !== 'Number') {
            throw new TypeError('page is not a number');
        }

        if (page !== null && !this.isValidPage(page)) {
            throw new RangeError('page is not a valid number');
        }
        this.page = page || this.page;
    }

    /**
     * Set the page size
     *
     * @param {number} size
     */
    setSize(size) {
        if (size !== null && (size.constructor.name !== 'Number' || size < 1)) {
            throw new TypeError('size is not a valid positive number');
        }

        this.size = size || this.size;
    }

    /**
     * Set the url
     *
     * @param {string} url
     */
    setUrl(url) {
        if (url !== null && url.constructor.name !== 'String') {
            throw new TypeError('url is not a valid string');
        }

        this.url = url || this.url;
    }

    setCount(count) {
        if (count) {
            this.count = count;
        }
    }
}

/**
 * Create Pagination with the paginator builder
 *
 * @param {array} items
 * @param {number|null} page
 * @param {number|null} size
 * @param {string|null} url
 *
 * @return {Paginator}
 */
const PaginatorBuilder = ({
    items,
    page = null,
    size = null,
    url = null,
    count = null,
}) => {
    const paginator = new Paginator();

    paginator.setCount(count);
    paginator.setItems(items);
    paginator.setSize(size);
    paginator.setPage(page);
    paginator.setUrl(url);

    return paginator;
};

export default PaginatorBuilder;
