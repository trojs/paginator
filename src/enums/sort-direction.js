import { Enum } from '@trojs/enum'

/**
 * @typedef SortDirectionEnum
 * @property {string} asc "asc"
 * @property {string} desc "desc"
 */

/**
 * Sort direction enum
 * @augments Enum
 * @readonly
 * @enum { SortDirectionEnum }
 */
export class SortDirection extends Enum {
  static asc = 'asc'
  static desc = 'desc'
}
