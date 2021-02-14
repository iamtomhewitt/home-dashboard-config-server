const mongoose = require('mongoose');

const EndpointsSchema = new mongoose.Schema({
  bbcNews: String,
  googleCalendar: String,
  journeyPlanner: String,
  recipeManager: String,
  release: String,
  repo: String,
  splitwise: String,
  todoist: String,
  trains: String,
  weather: String,
})

module.exports = mongoose.model('Endpoints', EndpointsSchema);
