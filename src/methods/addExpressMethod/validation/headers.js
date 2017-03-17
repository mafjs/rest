var validate = require('./validate');

var RestError = require('../../../Error');

module.exports = function (logger, middlewares, method) {

    if (method.schema.headers) {
        logger.trace('add headers validation for ', method.http);

        middlewares.push(function (req, res, next) {
            validate(req.headers, method.schema.headers)
                .then((valid) => {
                    req.headers = valid;
                    next();
                })
                .catch((originalError) => {
                    var error = RestError.createError(RestError.CODES.INVALID_REQUEST_DATA, error);

                    error.requestPart = 'headers';
                    error.details = originalError.details;

                    next(error);
                });
        });
    }

};
