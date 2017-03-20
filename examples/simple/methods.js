var joi = require('joi');

module.exports = {
    'GET /test': {
        handler: function (req, res) {
            res.time('test');

            setTimeout(function () {
                res.timeEnd('test');

                res.result({all: 'ok'});

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
    }
};
