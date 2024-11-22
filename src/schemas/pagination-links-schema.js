/**
 * @typedef {import('openapi-types').OpenAPIV3.SchemaObject} SchemaObject
 * @type {SchemaObject}
 */
export default {
    description: 'Pagination links',
    type: 'object',
    properties: {
        self: {
            type: 'string',
            example: '/v1/messages?&size=10&page=2',
            nullable: true
        },
        prev: {
            type: 'string',
            example: '/v1/messages?&size=10&page=1',
            nullable: true
        },
        next: {
            type: 'string',
            example: '/v1/messages?&size=10&page=3',
            nullable: true
        },
        first: {
            type: 'string',
            example: '/v1/messages?&size=10&page=0',
            nullable: true
        },
        last: {
            type: 'string',
            example: '/v1/messages?&size=10&page=4',
            nullable: true
        }
    }
}
