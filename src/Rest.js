const Http = require('maf-http');
const RestError = require('./Error');

const bodyParser = require('body-parser');

const helpers = require('./helpers');

const middlewares = require('./middlewares');

class Rest extends Http {
    constructor(logger, config) {
        super(logger, config);

        this.Error = RestError;

        // merging with maf-http responseHelpers
        this.responseHelpers = Object.assign(
            this.responseHelpers,
            helpers.response
        );

        this.middlewares = middlewares;
    }

    init(app, di) {
        return new Promise((resolve, reject) => {
            app.use(bodyParser.json({ type: '*/*' }));

            app.use((error, req, res, next) => {
                if (error instanceof SyntaxError) {
                    res.status(400).json({
                        error: {
                            message: 'request body is not valid JSON',
                            code: 'INVALID_JSON_BODY'
                        }
                    });
                } else {
                    next(error);
                }
            });

            super.init(app, di)
                .then(() => {
                    app.use(this.middlewares.send);
                    app.use(this.middlewares.notFound);
                    app.use(this.middlewares.error);
                    resolve(app);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

module.exports = Rest;
