const mongoService = require('./mongo');

module.exports = {
  async saveToken(token) {
    try {
      await mongoService.saveToken(token);
    } catch (err) {
      throw new Error(err);
    }
  },

  async deleteToken(gmail) {
    try {
      await mongoService.deleteToken(gmail);
    } catch (err) {
      throw new Error(err);
    }
  },
};
