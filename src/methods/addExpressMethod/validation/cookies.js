var validate = require('./validate');

var RestError = require('../../../Error');

module.exports = function (logger, middlewares, method) {

    if (method.schema.cookies) {
        logger.trace('add cookies validation for ', method.http);

        middlewares.push(function (req, res, next) {
            validate(req.cookies, method.schema.cookies)
                .then((valid) => {
                    req.cookies = valid;
                    next();
                })
                .catch((originalError) => {
                    var error = RestError.createError(RestError.CODES.INVALID_REQUEST_DATA, error);

                    error.requestPart = 'cookies';
                    error.details = originalError.details;

                    next(error);
                });
        });
    }

};
