const expressLoader = require('./express');
const mongoLoader = require('./mongo');

module.exports = async (app) => {
  await expressLoader(app);
  await mongoLoader();
};
