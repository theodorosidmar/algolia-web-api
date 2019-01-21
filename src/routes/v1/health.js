module.exports = (router) => {
  router.get('/health', (req, res) => res.end());
};
