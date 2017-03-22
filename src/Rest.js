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

}

module.exports = Rest;
