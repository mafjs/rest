var joi = require('joi');
var _ = require('lodash');

module.exports = {

    schema: function (options) {
        options = options || {};

        var defaultValue = options.default || 20;
        var min = options.min || 0;
        var max = options.max || 100;

        return joi.number().min(min).max(max).default(defaultValue);
    },

    get: function (obj) {
        return _.get(obj, 'limit');
    }
};
