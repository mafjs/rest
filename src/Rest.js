'use strict';

var Error = require('./Error');

var validateHttpParam = require('./methods/validateHttpParam');
var validateMethod = require('./methods/validateMethod');

class Rest {

    constructor (logger, config) {
        this.Error = Error;

        this._logger = this._validateLogger(logger);
        this._config = this._validateConfig(config);

        this._methods = [];
    }

    addMethod (rawHttp, rawMethod) {

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
}

module.exports = Rest;
