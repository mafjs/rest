const RestError = require('../Error');

// eslint-disable-next-line no-unused-vars
module.exports = function middlewareError(error, req, res, next) {
    if (res.requestEnd) {
        res.requestEnd();
    }

    error.getCheckChain()
        .ifCode(RestError.CODES.INVALID_REQUEST_DATA, (err) => {
            req.logger.trace('rest middlewareError, send 400 Bad Request');

            res.status(400).json({
                error: {
                    message: 'invalid request data',
                    requestPart: err.requestPart,
                    details: err.details
                }
            });
        })
        .else((err) => {
            req.logger.error({ req, err });
            res.status(500).json({
                error: {
                    message: 'Server Error',
                    code: 'SERVER_ERROR'
                }
            });
        })
        .check();
};