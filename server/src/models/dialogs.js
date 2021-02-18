const mongoose = require('mongoose');

const DialogsSchema = new mongoose.Schema({
  addNewRecipe: {
    mainColour: String,
    textColour: String,
  },
  confirm: {
    mainColour: String,
    textColour: String,
  },
  logs: {
    mainColour: String,
    textColour: String,
  },
  settings: {
    mainColour: String,
    textColour: String,
  },
  selectRecipe: {
    mainColour: String,
    textColour: String,
  },
  recipeSteps: {
    mainColour: String,
    textColour: String,
  },
  version: {
    mainColour: String,
    textColour: String,
  },
});

module.exports = mongoose.model('Dialogs', DialogsSchema);
