var Http = require('maf-http');

var bodyParser = require('body-parser');

var restResponseHelpers = require('./responseHelpers');

var middleware = {
    send: require('./middlewares/send')
};

class Rest extends Http {

    /**
     * @param {?Logger} logger
     * @param {?Object} config
     */
    constructor (logger, config) {
        super(logger, config);


        // merging with maf-http responseHelpers
        this.responseHelpers = Object.assign(
            this.responseHelpers,
            restResponseHelpers
        );

        this._restBeforeResponseMiddleware = middleware.send;
    }

    /**
     * @param {Express} app
     * @param {?Object} di
     * @return {Promise}
     */
    init (app, di) {

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

            super.setBeforeResponseMiddleware(this._restBeforeResponseMiddleware);

            super.init(app, di)
                .then(() => {
                    this._initErrorMiddleware(app);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });

    }

    /**
     * set before response middleware
     *
     * @param {Function} middleware
     */
    setBeforeResponseMiddleware (middleware) {
        this._restBeforeResponseMiddleware = middleware;
    }

    /**
     * @private
     * @param {Express} app
     */
    _initErrorMiddleware (app) {

        // eslint-disable-next-line no-unused-vars
        app.use((error, req, res, next) => {

            var logger = req.logger || this._logger;

            error.getCheckChain()
                .ifCode(this.Error.CODES.INVALID_REQUEST_DATA, (error) => {

                    res.status(400).json({
                        error: {
                            message: 'invalid request data',
                            requestPart: error.requestPart,
                            details: error.details
                        }
                    });

                })
                .else((error) => {
                    logger.error({req: req, err: error});
                    var response = res.httpContext.body;

                    if (!response) {
                        response = {
                            error: {
                                code: 'SERVER_ERROR',
                                message: 'server error'
                            }
                        };
                    }

                    res.status(500).json(response);
                })
                .check();

        });

    }

}

module.exports = Rest;
