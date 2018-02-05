class Utils {
  static getDataFromRequest(req) {
    return {
      url: req.url,
      baseUrl: req.baseUrl,
      originalUrl: req.originalUrl,
      method: req.method,
      headers: req.headers,
      body: req.body,
      query: req.query,
      params: req.params,
      user: req.user,
    };
  }
}

module.exports = Utils;
