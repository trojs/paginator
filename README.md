# Paginator

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-stats] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Codecov Status][codecov-image]][codecov-url] [![Scrutinizer Code Quality][scrutinizer-image]][scrutinizer-url]

With this package you can easy create a pagination object.

## Example usage

```
import Paginator from '@hckrnews/paginator'

 const results = Paginator({
    items,
    page,
    size,
    url
})
```

## fields

### items

The field `items` should be an array.
It doesnt matter what every item contains, but an object is common.

### page

The field `page` should be an integer, and it is optional.
You can set the current page with the page.
The first page is 0, and if you dont set a page, it is the first page.

### size

The field `size` should be an integer, and it is optional.
You can set the maximum of items per page with the size.
The minimum is 1, and the default is 10.

### url

The field `url` should be a string, and it is optional.
This will be used for the links, for e.g. the current, previous and next pages.

## result

Example:

```
{
    _links: {
        self: '/?test=true&size=10&page=1',
        prev: '/?test=true&size=10&page=0',
        next: '/?test=true&size=10&page=2'
    },
    count: 21,
    size: 10,
    page: 1,
    pages: 3,
    result: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
}
```

### _links

The field `_links` should be an object.
It returns the current page (`self`), previous page (`prev`) and the next page (`next`)
If there is no next or previous page, it returns `null`
If you dont have set an url, it returns for every link `null`

### count

The field `count` should be an integer.
It returns the total of items.

### size

The field `size` should be an integer.
The default is 10, and you can override it with the given size.

### pages

The field `pages` should be an integer.
It is the total of pages.
E.g.
If there are 20 items and the page size is 10, there are 2 pages.
And if there are 21 items and the page size is 10, there are 3 pages.

### result

The field `result` should be an array.
It returns all items for the given page.
E.g. in the example you see all items for page 1 (second page).
Because there are 21 items, the next page will return just an array with 1 item.

[downloads-image]: https://img.shields.io/npm/dm/@hckrnews/paginator.svg
[npm-url]: https://www.npmjs.com/package/@hckrnews/paginator
[npm-image]: https://img.shields.io/npm/v/@hckrnews/paginator.svg
[npm-stats]: https://npm-stat.com/charts.html?package=@hckrnews/paginator
[travis-url]: https://travis-ci.org/hckrnews/paginator
[travis-image]: https://img.shields.io/travis/hckrnews/paginator/main.svg
[coveralls-url]: https://coveralls.io/r/hckrnews/paginator
[coveralls-image]: https://img.shields.io/coveralls/hckrnews/paginator/main.svg
[codecov-url]: https://codecov.io/gh/hckrnews/paginator
[codecov-image]: https://img.shields.io/codecov/c/github/hckrnews/paginator.svg
[scrutinizer-url]: https://scrutinizer-ci.com/g/hckrnews/paginator/?branch=main
[scrutinizer-image]: https://scrutinizer-ci.com/g/hckrnews/paginator/badges/quality-score.png?b=main
