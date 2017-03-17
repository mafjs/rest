module.exports = require('maf-error').create('RestError', {
    INVALID_HTTP_PARAM_OBJECT: 'invalid http param object',
    INVALID_RESOURCE_OBJECT: 'invalid resource object',
    INVALID_METHOD_OBJECT: 'invalid resource method object for %method% %path%',
});
