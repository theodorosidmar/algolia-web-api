const express = require('express');
const { join } = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const configExpress = require('./config/express');
const Logger = require('./helpers/logger');

module.exports = async () => {
  dotenv.config();

  if (!process.env.APPLICATION_ID || !process.env.API_KEY) {
    Logger.logError('APPLICATION_ID and API_KEY must be provided');
    process.exit();
  }

  const app = express();
  const router = express.Router();

  const routes = join(__dirname, 'routes/v1');
  fs.readdirSync(routes).forEach(file => require(join(routes, file))(router));

  await configExpress(app, router);

  app.use('/api/v1', router);
  app.use('/', (req, res) => res.send());

  app.listen(process.env.PORT, () => {
    Logger.log(`Algolia service listening on port ${process.env.PORT}`);
  });
};
