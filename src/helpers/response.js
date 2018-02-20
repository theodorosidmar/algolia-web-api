const httpStatus = require('./http-status');

exports.defaultResponse = (data, statusCode = httpStatus.OK) => ({
  data,
  statusCode,
});

exports.errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => exports.defaultResponse({
  error: { message },
}, statusCode);
