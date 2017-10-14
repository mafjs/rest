const RestError = require('../Error');

// eslint-disable-next-line no-unused-vars
module.exports = function middlewareError(error, req, res, next) {
    if (res.requestEnd) {
        res.requestEnd();
    }

    if (typeof error.getCheckChain !== 'function') {
        req.logger.error({req, err: error});

        return res.status(500).json({
            error: {
                message: 'Server Error',
                code: 'SERVER_ERROR'
            }
        });
    }

    return error.getCheckChain()
        .ifCode('FORBIDDEN', (err) => {
            req.logger.trace('rest middlewareError, send 403 Forbidden');

            res.status(400).json({
                error: {
                    message: err.message,
                    code: err.code
                }
            });
        })
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
            if (err.req) {
                req.logger.error({err, req: err.req, res: err.res}, 'api-client error');
            }

            req.logger.error({req, err});
            res.status(500).json({
                error: {
                    message: 'Server Error',
                    code: 'SERVER_ERROR'
                }
            });
        })
        .check();
};
