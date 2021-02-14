const expressLoader = require('./express');
const mongoLoader = require('./mongo');
const corsLoader = require('./cors');

module.exports = async (app) => {
  await corsLoader(app);
  await expressLoader(app);
  await mongoLoader();
};
