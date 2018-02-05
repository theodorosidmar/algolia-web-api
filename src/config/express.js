const bodyParser = require('body-parser');
const helmet = require('helmet');
const httpStatus = require('http-status');

const Utils = require('../helpers/utils');
const Logger = require('../helpers/logger');

module.exports = async (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());

  app.use((req, res, next) => {
    const data = Utils.getDataFromRequest(req);
    Logger.log(data);
    return next();
  });

  app.use((err, req, res, next) => {
    const data = Utils.getDataFromRequest(req);
    data.err = err;
    Logger.logError(data);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  });
};
