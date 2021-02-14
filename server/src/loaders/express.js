const bodyParser = require('body-parser');
const listEndpoints = require('express-list-endpoints');
const tokenRoutes = require('../api/token');
const { version } = require('../../package.json');

module.exports = async (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/token', tokenRoutes);

  app.get('/', (req, res) => {
    res.json({ status: 'UP', version, endpoints: listEndpoints(app) });
  });
};
