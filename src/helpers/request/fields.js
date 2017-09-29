const stringArray = require('./stringArray');

module.exports = {
    schema: stringArray.schema,
    get(obj) {
        return stringArray.get(obj, 'fields');
    }
};
