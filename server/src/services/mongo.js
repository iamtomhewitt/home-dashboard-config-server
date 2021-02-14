const ConfigSchema = require('../models');

module.exports = {
  async getConfigForToken({ token }) {
    return ConfigSchema.findOne({ token });
  },

  async saveConfigForToken({ token, config }) {
    const { dialogs, endpoints, widgets } = config;
    try {
      const c = new ConfigSchema({
        dialogs,
        endpoints,
        token,
        widgets
      })

      const newConfig = c.toObject();
      delete newConfig._id; // Stop mongo throwing an error

      const query = { 'token': token }
      await ConfigSchema.findOneAndUpdate(query, newConfig, { upsert: true });
    }
    catch (err) {
      throw new Error(err);
    }
  }
};