const joi = require('maf-http/joi');
const _ = require('lodash');

module.exports = {

    schema(rawOptions) {
        const options = rawOptions || {};

        const defaultValue = options.default || 0;
        const max = options.max || 100;

        return joi.number().min(0).max(max).default(defaultValue);
    },

    get(obj) {
        return _.get(obj, 'skip');
    }
};
