var stringArray = require('./stringArray');

module.exports = {
    schema: stringArray.schema,
    get: function (obj) {
        return stringArray.get(obj, 'fields');
    }
};
