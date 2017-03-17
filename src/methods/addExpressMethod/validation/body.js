var validate = require('./validate');

var RestError = require('../../../Error');

module.exports = function (logger, middlewares, method) {

    if (method.schema.body) {
        logger.trace('add body validation for ', method.http);

        middlewares.push(function (req, res, next) {
            validate(req.body, method.schema.body)
                .then((valid) => {
                    req.body = valid;
                    next();
                })
                .catch((originalError) => {
                    var error = RestError.createError(RestError.CODES.INVALID_REQUEST_DATA, error);

                    error.requestPart = 'body';
                    error.details = originalError.details;

                    next(error);
                });
        });
    }

};
