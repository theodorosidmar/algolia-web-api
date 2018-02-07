const bodyParser = require('body-parser');
const helmet = require('helmet');
const httpStatus = require('http-status');
const algoliasearch = require('algoliasearch');
const responseHelper = require('../helpers/response');
const Logger = require('../helpers/logger');

module.exports = async (app, router) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());

  app.use((req, res, next) => {
    const data = {
      url: req.url,
      baseUrl: req.baseUrl,
      originalUrl: req.originalUrl,
      method: req.method,
      headers: req.headers,
      body: req.body,
      query: req.query,
      params: req.params,
    };
    Logger.log(data);
    if (!req.headers.applicationid || !req.headers.apikey) {
      const response = responseHelper.errorResponse('ApplicationID and APIKey must be provided');
      return res.status(response.statusCode).json(response.data);
    }
    res.locals.algoliaClient = algoliasearch(req.headers.applicationid, req.headers.apikey);
    return next();
  });

  router.use((err, req, res, next) => {
    Logger.logError(err);
    const response =
      responseHelper.errorResponse(err.message, err.statusCode || httpStatus.INTERNAL_SERVER_ERROR);
    return res.status(response.statusCode).json(response.data);
  });
};
