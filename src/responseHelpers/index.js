module.exports = {

    result: function (result, metadata) {

        this.httpContext.body = {
            metadata: metadata,
            result: result
        };

        this.httpContextNext();

    },

    badRequest: function (error) {
        this.status(400);

        this.httpContext.body = {
            error: {
                message: error.message,
                entity: error.entity,
                code: error.code,
                list: error.list
            }
        };

        this.httpContextNext();
    },

    conflict: function (error) {
        this.status(409);

        this.httpContext.body = {
            error: {
                message: error.message,
                entity: error.entity,
                code: error.code,
                list: error.list
            }
        };

        this.httpContextNext();
    },

    notFound: function (error) {
        this.status(404);

        this.httpContext.body = {
            error: {
                message: error.message,
                entity: error.entity,
                code: error.code,
                list: error.list
            }
        };

        this.httpContextNext();
    },

    serverError: function (error) {
        this.status(500);

        this.httpContext.body = {
            error: {
                message: 'Server Error',
                code: 'SERVER_ERROR'
            }
        };

        this.httpContextNext(error);
    },

    forbidden: function (error) {
        this.status(403);

        this.httpContext.body = {
            error: {
                message: error.message,
                entity: error.entity,
                code: 'FORBIDDEN',
                list: error.list
            }
        };

        this.httpContextNext();
    },

    unauthorized: function (error) {
        this.status(401);

        this.httpContext.body = {
            error: {
                message: error.message,
                entity: error.entity,
                code: 'UNAUTHORIZED',
                list: error.list
            }
        };

        this.httpContextNext();
    },

    sendFindResult: function (result, requestQuery, api) {
        var metadata = {
            resultset: {
                count: result.docs.length,
                total: result.total,
                limit: requestQuery.limit,
                offset: requestQuery.offset
            }
        };

        var docs = api.clearSystemFields(result.docs);

        this.result(docs, metadata);
    }

    // ...
};
