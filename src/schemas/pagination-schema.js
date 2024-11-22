/**
 * @typedef {import('openapi-types').OpenAPIV3.SchemaObject} SchemaObject
 * @param {object} params - The parameters object
 * @param {string} params.schema - The name of the schema to be used in the items array
 * @param {string=} params.schemaBase - The name of the schema to be used in the items array
 * @returns {SchemaObject} The schema object
 */
export default ({ schema, schemaBase = '#/components/schemas/' }) => ({
    type: 'object',
    required: [
        'count',
        'pages',
        'size',
        'page',
        'items'
    ],
    properties: {
        cursors: {
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
        },
        count: {
            type: 'number',
            minimum: 0,
            maximum: 100000,
            example: 42,
            description: 'Total records'
        },
        pages: {
            type: 'number',
            minimum: 0,
            example: 5,
            description: 'Total pages'
        },
        size: {
            type: 'number',
            minimum: 1,
            example: 10,
            maximum: 100000,
            description: 'Page size'
        },
        page: {
            type: 'number',
            minimum: 0,
            example: 2,
            description: 'Current page'
        },
        items: {
            type: 'array',
            items: {
                $ref: `${schemaBase}${schema}`
            }
        }
    }
})
