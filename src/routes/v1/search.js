module.exports = (app, router) => {
  router.get('/search', (req, res, next) => {
    try {
      return res.send('search working fine!');
    } catch (error) {
      return next(error);
    }
  });
};
