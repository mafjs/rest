require('maf-error/initGlobal');

module.exports = () => {
    const logger = require('maf-logger').create('maf-rest');

    logger.level('fatal');

    const express = require('express');

    const app = express();

    app.disable('x-powered-by');
    app.disable('etag');

    app.use((req, res, next) => {
        req.debug = false;
        next();
    });

    const Rest = require(`${__dirname}/../../../src/Rest`);

    const rest = new Rest(logger);

    rest.setEndpoint('/api');

    const methods = require('./methods');

    return Promise.resolve()
        .then(() => rest.initApp(app))
        .then(() => rest.addMethods(methods))
        .then(() => rest.initMethods(app))
        .then(() => {
            return app;
        });
};
