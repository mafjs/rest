const HttpError = require('maf-http/Error');

const RestError = HttpError.extendCodes({});

module.exports = RestError;
