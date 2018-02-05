const express = require('express');
const { join } = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const configExpress = require('./config/express');
const { log } = require('./helpers/logger');

module.exports = async () => {
  dotenv.config();
  const app = express();
  const router = express.Router();

  const routes = join(__dirname, `routes/${process.env.API_VERSION}`);
  fs.readdirSync(routes).forEach(file =>
    require(join(routes, file))(app, router));

  await configExpress(app);

  app.use(process.env.API_URL, router);

  app.listen(process.env.PORT, () => {
    log(`Algolia RESTful WebAPI listening on port ${process.env.PORT}`);
  });
};
