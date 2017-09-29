const joi = require('joi');
const _ = require('lodash');

module.exports = {

    schema(rawOptions) {
        const options = rawOptions || {};

        const defaultValue = options.default || 20;
        const min = options.min || 0;
        const max = options.max || 100;

        return joi.number().min(min).max(max).default(defaultValue);
    },

    get(obj) {
        return _.get(obj, 'limit');
    }
};
