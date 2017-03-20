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

var methods = require('./methods');

Promise.resolve()
    .then(() => {
        return http.addMethods(methods);
    })
    .then(() => {
        return http.init(app);
    })
    .then(() => {

        app.use(function (error, req, res, next) {
            logger.error(error);
            res.status(500).json(res.httpContext.body);
        });

        app.listen(3000);
    })
    .catch((error) => {
        logger.fatal(error);
    });
