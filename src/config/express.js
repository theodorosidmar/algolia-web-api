const bodyParser = require('body-parser');
const helmet = require('helmet');
const httpStatus = require('http-status');

const Utils = require('../helpers/utils');
const responseHelper = require('../helpers/response');
const Logger = require('../helpers/logger');

module.exports = async (app, router) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());

  app.use((req, res, next) => {
    const data = Utils.getDataFromRequest(req);
    Logger.log(data);
    return next();
  });

  router.use((err, req, res, next) => {
    Logger.logError(err);
    const response =
      responseHelper.errorResponse(err.message, err.statusCode || httpStatus.INTERNAL_SERVER_ERROR);
    return res.status(response.statusCode).json(response.data);
  });
};
