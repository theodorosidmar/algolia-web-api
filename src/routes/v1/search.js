const responseHelper = require('../../helpers/response');

module.exports = (router) => {
  router.post('/search', async (req, res, next) => {
    try {
      let response;
      if (!Array.isArray(req.body) || !req.body.length) {
        response = responseHelper.errorResponse('Body must be a valid array');
        return res.status(response.statusCode).json(response.data);
      }
      const result = await res.locals.algoliaClient.search(req.body);
      response = responseHelper.defaultResponse(result);
      return res.status(response.statusCode).json(response.data);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/search-all', async (req, res, next) => {
    try {
      let response;
      if (!req.body.query) {
        response = responseHelper.errorResponse('Query must be provided');
        return res.status(response.statusCode).json(response.data);
      }
      const indexes = await res.locals.algoliaClient.listIndexes();
      const queries = [];
      indexes.items.forEach(item => queries.push({
        indexName: item.name,
        query: req.body.query,
        params: req.body.params || null,
      }));
      const result = await res.locals.algoliaClient.search(queries);
      response = responseHelper.defaultResponse(result);
      return res.status(response.statusCode).json(response.data);
    } catch (error) {
      return next(error);
    }
  });
};
