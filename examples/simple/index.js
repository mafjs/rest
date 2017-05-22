require('source-map-support').install();

var logger = require('log4js-nested').getLogger('maf-rest');

var express = require('express');

var app = express();

app.disable('x-powered-by');
app.disable('etag');

app.use(function (req, res, next) {
    req.debug = true;
    next();
});

var Rest = require('../../package/Rest');

var http = new Rest(logger);

http.setEndpoint('/api/v0');

var methods = require('./methods');

Promise.resolve()
    .then(() => {
        return http.addMethods(methods);
    })
    .then(() => {
        return http.init(app);
    })
    .then(() => {

        // eslint-disable-next-line no-unused-vars
        app.use(function (error, req, res, next) {

            error.getCheckChain()
                .ifCode(http.Error.CODES.INVALID_REQUEST_DATA, function (error) {
                    res.status(400).json({
                        error: {
                            message: 'invalid request data',
                            requestPart: error.requestPart,
                            details: error.details
                        }
                    });
                })
                .else(function (error) {
                    logger.error(error);
                    res.status(500).json(res.httpContext.body);
                })
                .check();

        });

        app.listen(3007, function () {
            logger.info('listen on 3007');
        });
    })
    .catch((error) => {
        logger.fatal(error);
    });
