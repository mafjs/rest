const joi = require('maf-http/joi');

const _map = require('lodash/map');
const _trim = require('lodash/trim');

const joiExtended = joi.extend((joi) => {
    return {
        base: joi.alternatives().try(joi.array().items(joi.string()), joi.string()),
        name: 'stringArray',
        pre(rawValue, state, options) {
            let value = null;

            if (typeof rawValue === 'string') {
                value = _map(rawValue.split(','), (v) => _trim(v));
            } else if (Array.isArray(rawValue)) {
                value = _map(rawValue, (v) => _trim(v));
            }

            return value;
        }
    };
});

module.exports = joiExtended;
