var HttpError = require('maf-http/Error');

var RestError = HttpError.extendCodes({});

module.exports = RestError;
