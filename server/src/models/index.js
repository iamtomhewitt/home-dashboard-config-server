const mongoose = require('mongoose');
const DialogsSchema = require('./dialogs').schema
const EndpointsSchema = require('./endpoints').schema
const WidgetsSchema = require('./widgets').schema

const ConfigSchema = new mongoose.Schema({
  dialogs: DialogsSchema,
  endpoints: EndpointsSchema,
  token: String,
  widgets: WidgetsSchema
});

module.exports = mongoose.model('Config', ConfigSchema);
