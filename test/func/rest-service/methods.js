const joi = require('maf-http/joi');

const TestError = Error.create('TestError', {
    TEST_CODE: 'test code'
});

module.exports = {
    'GET /test': {
        beforeInit: [
            (req, res, next) => {
                res._beforeInitCalled = true;
                next();
            }
        ],
        inited: [
            (req, res, next) => {
                res.ctx.body = {
                    middlewares: []
                };

                if (res._beforeInitCalled === true) {
                    res.ctx.body.middlewares.push('beforeInit');
                }

                res.ctx.body.middlewares.push('inited1');
                next();
            },
            (req, res, next) => {
                res.ctx.body.middlewares.push('inited2');
                next();
            }
        ],
        validated: [
            (req, res, next) => {
                res.ctx.body.middlewares.push('validated');
                next();
            }
        ],
        handler(req, res) {
            res.ctx.status = 200;
            res.ctx.body.middlewares.push('handler');
            res.sendCtx();
        }
    },

    // 'GET /test/:id': {
    //     handler(req, res) {
    //         res.result(`/test/${req.params.id}`);
    //     }
    // },

    'POST /test': {
        onCreate(method) {
            method.schema.body = joi.object().required().keys({
                id: joi.number().required()
            });
        },
        handler(req, res) {
            res.result(req.body);
        }
    },

    'GET /result': {
        handler(req, res) {
            res.result('result');
        }
    },

    'GET /bad_request': function badRequest(req, res) {
        const error = new Error('invalid data');

        error.code = 'INVALID_DATA';

        error.list = [
            {
                a: 1
            }
        ];

        res.badRequest(error);
    },

    'GET /not_found': function notFound(req, res) {
        const error = new Error('task not found');

        error.code = 'NOT_FOUND';

        error.entity = 'task';

        error.list = [
            {
                a: 1
            }
        ];

        res.notFound(error);
    },

    'GET /server_error': function serverError(req, res) {
        const error = new Error('some server error');

        res.serverError(error);
    },

    'GET /forbidden': function forbidden(req, res) {
        const error = new Error('access forbidden');

        res.forbidden(error);
    },

    'GET /unauthorized': function unauthorized(req, res) {
        const error = new Error('auth required');

        res.unauthorized(error);
    },

    'GET /conflict': function conflict(req, res) {
        const error = new Error('conflict');

        error.code = 'ALREADY_EXISTS';

        res.conflict(error);
    },

    'GET /maf_error': function mafError(req, res) {
        const oe = new Error('this is original error message');
        const e = new TestError(TestError.CODES.TEST_CODE, oe);

        res.serverError(e);
    }
};
