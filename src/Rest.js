var kindOf = require('maf-kind-of');
var RestError = require('./Error');

var validateHttpParam = require('./methods/validateHttpParam');
var validateMethod = require('./methods/validateMethod');
var addExpressMethod = require('./methods/addExpressMethod');

class Rest {

    constructor (logger, config) {
        this.Error = RestError;

        this._logger = this._validateLogger(logger);
        this._config = this._validateConfig(config);

        this._methods = [];
    }

    addMethod (rawHttp, rawMethod) {

        this._logger.debug('addMethod', rawHttp, rawMethod);

        var http = null;
        var method = null;

        return Promise.resolve()
            .then(() => {
                return validateHttpParam(this._logger, this._config, rawHttp);
            })
            .then((validHttp) => {
                http = validHttp;

                return validateMethod(this._logger, this._config, http, rawMethod);
            })
            .then((validMethod) => {
                method = validMethod;

                method.http = http;

                this._methods.push(method);

                return true;
            });
    }

    addMethods (methods) {

        return new Promise((resolve, reject) => {

            this._logger.debug('addMethods', methods);

            var methodsParamType = kindOf(methods);

            if (methodsParamType !== 'object') {
                return reject(
                    RestError.createError(RestError.CODES.INVALID_ARGS)
                        .bind({
                            method: 'addMethods',
                            param: 'methods',
                            validType: 'object',
                            type: methodsParamType,
                            value: this._json(methods)
                        })
                );
            }

            var promises = [];

            for (var http in methods) {
                this._logger.debug('addMethods => addMethod', http, methods[http]);
                promises.push(this.addMethod(http, methods[http]));
            }

            Promise.all(promises)
                .then(() => {
                    resolve();
                })
                .catch(reject);
        });


    }

    init (app) {
        // app should be express app

        return new Promise((resolve, reject) => {

            var promises = [];

            for (var i in this._methods) {

                promises.push(
                    addExpressMethod(
                        this._logger,
                        this._config,
                        app,
                        this._methods[i]
                    )
                );

            }

            Promise.all(promises)
                .then(() => {
                    resolve();
                })
                .catch(reject);

        });

    }

    _validateLogger (logger) {
        // TODO check logger
        return logger;
    }

    _validateConfig (config) {
        // TODO check config
        if (!config) {

            return {
                strictResourceValidation: false,
                strictMethodValidation: false
            };

        }

        return config;
    }

    _json (value) {
        return JSON.stringify(value);
    }
}

module.exports = Rest;
