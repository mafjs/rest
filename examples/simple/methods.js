const joi = require('maf-http/joi');

const TestError = Error.create('TestError', {
    TEST_CODE: 'test code'
});

module.exports = {
    'GET /test': {
        handler(req, res) {
            res.time('test');

            req.logger.debug(req.getQueryParams(['test']));

            setTimeout(() => {
                res.timeEnd('test');

                res.result('/test/count');
            }, 100);
        }
    },

    'GET /test/:id': {
        handler(req, res) {
            res.time('test');

            setTimeout(() => {
                res.timeEnd('test');

                res.json(`/test/${req.params.id}`);
            }, 100);
        }
    },

    'POST /test': {
        beforeMethodCreation(method) {
            // eslint-disable-next-line no-param-reassign
            method.schema.body = joi.object().required().keys({
                q: joi.string().required()
            });
        },
        handler(req, res) {
            res.result(req.body);
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

        res.conflict(error);
    },

    'GET /maf_error': function mafError(req, res) {
        const oe = new Error('this is original error message');
        const e = new TestError(TestError.CODES.TEST_CODE, oe);

        res.serverError(e);
    }
};
