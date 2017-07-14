require('source-map-support').install();

require('maf-error/initGlobal');

var logger = require('maf-logger').create('maf-rest');

logger.level('TRACE');

var express = require('express');

var app = express();

app.disable('x-powered-by');
app.disable('etag');

app.use(function (req, res, next) {
    req.debug = false;
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
        app.listen(3007, function () {
            logger.info('listen on 3007');
        });
    })
    .catch((error) => {
        logger.fatal(error);
    });
