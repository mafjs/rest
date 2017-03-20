var Http = require('maf-http');

var bodyParser = require('body-parser');

var restResponseHelpers = require('./responseHelpers');

var initSend = require('./methods/initSend');

class Rest extends Http {

    /**
     * @param {?Logger} logger
     * @param {?Object} config
     */
    constructor (logger, config) {
        super(logger, config);

        this.responseHelpers = Object.assign(
            this.responseHelpers,
            restResponseHelpers
        );
    }

    /**
     * @param {Express} app
     * @return {Promise}
     */
    init (app) {

        return new Promise((resolve, reject) => {

            app.use(bodyParser.json({type: '*/*'}));

            app.use(function (error, req, res, next) {

                if (error instanceof SyntaxError) {
                    res.status(400).json({
                        error: {
                            message: 'request body is not valid JSON',
                            code: 'INVALID_JSON_BODY'
                        }
                    });
                } else {
                    next();
                }

            });

            super.init(app)
                .then(() => {

                    initSend(this._logger, app);

                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });

    }

}

module.exports = Rest;
