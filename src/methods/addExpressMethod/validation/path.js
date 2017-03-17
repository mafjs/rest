var validate = require('./validate');

var RestError = require('../../../Error');

module.exports = function (logger, middlewares, method) {

    if (method.schema.path) {
        logger.trace('add path params validation for ', method.http);

        middlewares.push(function (req, res, next) {
            validate(req.params, method.schema.path)
                .then((valid) => {
                    req.params = valid;
                    next();
                })
                .catch((originalError) => {
                    var error = RestError.createError(RestError.CODES.INVALID_REQUEST_DATA, error);

                    error.requestPart = 'path';
                    error.details = originalError.details;

                    next(error);
                });
        });
    }

};
