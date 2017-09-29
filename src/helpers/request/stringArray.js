const joi = require('joi');
const _ = require('lodash');

module.exports = {
    schema() {
        return joi.alternatives().try(joi.array().items(joi.string()), joi.string());
    },

    get(obj, name) {
        const rawFields = _.get(obj, name, null);

        if (!rawFields) {
            return null;
        }

        let fields = null;

        if (typeof rawFields === 'string') {
            fields = _.map(rawFields.split(','), v => _.trim(v));
        } else if (Array.isArray(rawFields)) {
            fields = rawFields;
        } else {
            // TODO
        }

        return fields;
    }
};
