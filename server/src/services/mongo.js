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
      await c.save();
    }
    catch (err) {
      throw new Error(err);
    }
  }
};