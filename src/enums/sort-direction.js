import { Enum } from '@trojs/enum'

/* eslint-disable sonarjs/public-static-readonly */

/**
 * @typedef {object} SortDirectionEnum
 * @property {string} asc
 * @property {string} desc
 */

/**
 * Sort direction enum
 * @augments Enum
 * @readonly
 * @enum { SortDirectionEnum }
 */
class SortDirection extends Enum {
    static asc = 'asc'
    static desc = 'desc'
}

export { SortDirection }
