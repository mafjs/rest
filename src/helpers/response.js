module.exports = {
    sendCtx(res, next, status) {
        if (typeof status !== 'undefined') {
            res.ctx.status = status;
        }

        next('send');
    },

    result(res, next, result, metadata) {
        res.ctx.status = 200;

        res.ctx.body = {
            metadata,
            result
        };

        next('send');
    },

    badRequest(res, next, error) {
        res.ctx.status = 400;

        res.ctx.body = {
            error: {
                message: error.message,
                code: error.code,
                list: error.list
            }
        };

        next('send');
    },

    conflict(res, next, error) {
        res.ctx.status = 409;

        res.ctx.body = {
            error: {
                message: error.message,
                entity: error.entity,
                code: error.code,
                list: error.list
            }
        };

        next('send');
    },

    notFound(res, next, error) {
        res.ctx.status = 404;

        res.ctx.body = {
            error: {
                message: error.message,
                code: error.code,
                list: error.list,
                entity: error.entity
            }
        };

        next('send');
    },

    serverError(res, next, error) {
        next(error);
    },

    forbidden(res, next, error) {
        res.ctx.status = 403;

        res.ctx.body = {
            error: {
                message: error.message,
                code: 'FORBIDDEN',
                list: error.list
            }
        };

        next('send');
    },

    unauthorized(res, next, error) {
        res.ctx.status = 401;

        res.ctx.body = {
            error: {
                message: error.message,
                entity: error.entity,
                code: 'UNAUTHORIZED',
                list: error.list
            }
        };

        next('send');
    },

    created(res, next, result) {
        res.ctx.status = 201;

        res.ctx.body = {
            result
        };
    }


};
