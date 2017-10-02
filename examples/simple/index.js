require('maf-error/initGlobal');

const logger = require('maf-logger').create('maf-rest');

logger.level('TRACE');

const express = require('express');

const app = express();

app.disable('x-powered-by');
app.disable('etag');

app.use((req, res, next) => {
    req.debug = false;
    next();
});

const Rest = require('../../src/Rest');

const rest = new Rest(logger);

rest.setEndpoint('/api/v0');

const methods = require('./methods');

// rest.middlewares.send = (error, req, res, next) => {
//     if (error === 'send') {
//         res.requestEnd();
//         const { ctx } = res;
//         res.status(ctx.status);
//         // TODO headers
//         return res.json('custom send');
//     }
//
//     return next(error);
// };

Promise.resolve()
    .then(() => rest.initApp(app))
    .then(() => rest.addMethods(methods))
    .then(() => rest.initMethods(app))
    .then(() => {
        app.listen(3007, () => {
            logger.info('listen on 3007');
        });
    })
    .catch((error) => {
        logger.fatal(error);
    });
