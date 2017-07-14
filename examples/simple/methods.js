var joi = require('joi');

var TestError = require('maf-error').create('TestError', {
    TEST_CODE: 'test code'
});

module.exports = {
    'GET /test/count': {
        handler: function (req, res) {
            res.time('test');

            console.log(req.getQueryParams(['test']));

            setTimeout(function () {
                res.timeEnd('test');

                res.result('/test/count');

            }, 100);

        }
    },

    'GET /test/:id': {
        handler: function (req, res) {
            res.time('test');

            setTimeout(function () {
                res.timeEnd('test');

                res.json('/test/:id');

            }, 100);

        }
    },

    'POST /test': {
        beforeMethodCreation: function (method) {
            method.schema.body = joi.object().keys({
                q: joi.string().required()
            });
        },
        handler: function (req, res) {
            res.result(req.body);
        }
    },

    'GET /badRequest': function (req, res) {

        var error = new Error('invalid data');

        error.code = 'INVALID_DATA';

        error.list = [
            {
                a: 1
            }
        ];

        res.badRequest(error);
    },

    'GET /notFound': function (req, res) {
        var error = new Error('task not found');

        error.code = 'NOT_FOUND';

        error.entity = 'task';

        error.list = [
            {
                a: 1
            }
        ];

        res.notFound(error);
    },

    'GET /serverError': function (req, res) {
        var error = new Error('some server error');

        res.serverError(error);
    },

    'GET /forbidden': function (req, res) {
        var error = new Error('access forbidden');

        res.forbidden(error);
    },

    'GET /unauthorized': function (req, res) {
        var error = new Error('auth required');

        res.unauthorized(error);
    },

    'GET /mafError': function (req, res) {
        var oe = new Error('this is original error message');
        var e = new TestError(TestError.CODES.TEST_CODE, oe);

        res.serverError(e);
    }
};
