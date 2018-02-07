const responseHelper = require('../../helpers/response');

module.exports = (router) => {
  router.post('/add', async (req, res, next) => {
    try {
      let response;
      if (!req.body.indexName || !req.body.objects || !Array.isArray(req.body.objects)) {
        response = responseHelper.errorResponse('You must provide indexName and objects as array');
        return res.status(response.statusCode).json(response.data);
      }
      const index = res.locals.algoliaClient.initIndex(req.body.indexName);
      const result = await index.addObjects(req.body.objects);
      response = responseHelper.defaultResponse(result);
      return res.status(response.statusCode).json(response.data);
    } catch (error) {
      return next(error);
    }
  });
};
