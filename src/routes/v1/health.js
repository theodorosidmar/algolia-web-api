module.exports = (router) => {
  router.get('/health', (req, res, next) => {
    return res.end()
  });
};
