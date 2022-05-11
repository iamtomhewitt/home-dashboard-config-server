import { createStore } from 'redux';

const initalState = {
  config: {},
};

function reducer(state = initalState, action) {
  console.log('Action: ', action.type);

  switch (action.type) {
  case 'CONFIG':
    return {
      config: action.config,
    };

  case 'BBC_NEWS':
    state.config.widgets.bbcNews = action.data;
    return state;

  case 'BIN_DAY':
    state.config.widgets.binDay = action.data;
    state.config.widgets.binDay.bins = action.bins;
    return state;

  case 'BUSES':
    state.config.widgets.buses = action.data;
    return state;

  case 'CLOCK':
    state.config.widgets.clock = action.data;
    return state;

  case 'FOOD_PLANNER':
    state.config.widgets.foodPlanner = action.data;
    return state;

  case 'GMAIL':
    state.config.widgets.gmail = action.data;
    return state;

  case 'JOURNEY_PLANNER':
    state.config.widgets.journeyPlanner = action.data;
    state.config.widgets.journeyPlanner.journeys = action.journeys;
    return state;

  case 'SHOPPING_LIST':
    state.config.widgets.shoppingList = action.data;
    return state;

  case 'SPLITWISE':
    state.config.widgets.splitwise = action.data;
    return state;

  case 'TODO_LIST':
    state.config.widgets.todoList = action.data;
    return state;

  case 'TRAINS':
    state.config.widgets.trains = action.data;
    return state;

  case 'WEATHER':
    state.config.widgets.weather = action.data;
    return state;

  case 'DIALOG_ADD_NEW_RECIPE':
    state.config.dialogs.addNewRecipe = action.data;
    return state;

  case 'DIALOG_CONFIRM':
    state.config.dialogs.confirm = action.data;
    return state;

  case 'DIALOG_LOGS':
    state.config.dialogs.logs = action.data;
    return state;

  case 'DIALOG_SETTINGS':
    state.config.dialogs.settings = action.data;
    return state;

  case 'DIALOG_SELECT_RECIPES':
    state.config.dialogs.selectRecipe = action.data;
    return state;

  case 'DIALOG_RECIPE_STEPS':
    state.config.dialogs.recipeSteps = action.data;
    return state;

  case 'DIALOG_VERSION':
    state.config.dialogs.version = action.data;
    return state;

  default:
    return state;
  }
}

export default createStore(reducer);
