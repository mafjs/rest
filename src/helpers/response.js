module.exports = {
    result(next, result, metadata) {
        this.ctx.status = 200;

        this.ctx.body = {
            metadata,
            result
        };

        next('send');
    },

    badRequest(next, error) {
        this.ctx.status = 400;

        this.ctx.body = {
            error: {
                message: error.message,
                code: error.code,
                list: error.list
            }
        };

        next('send');
    },

    conflict(next, error) {
        this.ctx.status = 409;

        this.ctx.body = {
            error: {
                message: error.message,
                entity: error.entity,
                code: error.code,
                list: error.list
            }
        };

        next('send');
    },

    notFound(next, error) {
        this.ctx.status = 404;

        this.ctx.body = {
            error: {
                message: error.message,
                code: error.code,
                list: error.list
            }
        };

        next('send');
    },

    serverError(next, error) {
        next(error);
    },

    forbidden(next, error) {
        this.ctx.status = 403;

        this.ctx.body = {
            error: {
                message: error.message,
                code: 'FORBIDDEN',
                list: error.list
            }
        };

        next('send');
    },

    unauthorized(next, error) {
        this.ctx.status = 401;

        this.ctx.body = {
            error: {
                message: error.message,
                entity: error.entity,
                code: 'UNAUTHORIZED',
                list: error.list
            }
        };

        next('send');
    }


};
