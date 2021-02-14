const mongoose = require('mongoose');

// TODO separate out similar config into separate schemas e.g. online lists
const WidgetsSchema = new mongoose.Schema({
  bbcNews: {
    apiKey: String,
    colour: String,
    repeatRate: Number,
    repeatTime: String,
    secondsBetweenArticles: Number,
    sleepEnd: String,
    sleepStart: String,
    textColour: String,
    title: String,
  },
  binDay: {
    colour: String,
    noBinColour: String,
    repeatRate: Number,
    repeatTime: String,
    sleepEnd: String,
    sleepStart: String,
    textColour: String,
    title: String,
    bins: [
      {
        binColour: String,
        firstDate: String,
        name: String,
        repeatRateInDays: Number,
      }
    ]
  },
  clock: {
    colour: String,
    repeatRate: Number,
    repeatTime: String,
    sleepEnd: String,
    sleepStart: String,
    textColour: String,
    title: String,
  },
  foodPlanner: {
    apiKey: String,
    colour: String,
    plannerBackgroundColour: String,
    plannerId: String,
    plannerTextColour: String,
    repeatRate: Number,
    repeatTime: String,
    sleepEnd: String,
    sleepStart: String,
    textColour: String,
    title: String,
  },
  journeyPlanner: {
    apiKey: String,
    colour: String,
    repeatRate: Number,
    repeatTime: String,
    sleepEnd: String,
    sleepStart: String,
    textColour: String,
    title: String,
    titleColour: String,
    journeys: [
      {
        endPoint: String,
        name: String,
        startPoint: String,
      }
    ]
  },
  gmail: [{
    apiKey: String,
    colour: String,
    gmailAddress: String,
    numberOfEvents: Number,
    repeatRate: Number,
    repeatTime: String,
    sleepEnd: String,
    sleepStart: String,
    textColour: String,
    title: String,
    titleColour: String,
  }],
  shoppingList: {
    apiKey: String,
    colour: String,
    repeatRate: Number,
    repeatTime: String,
    sleepEnd: String,
    sleepStart: String,
    textColour: String,
    title: String,
    titleColour: String,
    todoistId: String,
  },
  todoList: {
    apiKey: String,
    colour: String,
    repeatRate: Number,
    repeatTime: String,
    sleepEnd: String,
    sleepStart: String,
    textColour: String,
    title: String,
    titleColour: String,
    todoistId: String,
  },
  weather: {
    apiKey: String,
    colour: String,
    latitude: String,
    longitude: String,
    repeatRate: Number,
    repeatTime: String,
    sleepEnd: String,
    sleepStart: String,
    textColour: String,
    title: String,
    titleColour: String,
  }
})

module.exports = mongoose.model('Widgets', WidgetsSchema);
