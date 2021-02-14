import { createStore } from "redux";

const initalState = {
  config: {}
}

function reducer(state = initalState, action) {
  console.log('state is currently', state)
  console.log('action is', action)

  switch (action.type) {
    case 'CONFIG':
      return {
        config: action.config
      };

    case 'BBC_NEWS':
      state.config.widgets.bbcNews = action.data;
      return state;

    case 'BIN_DAY':
      state.config.widgets.binDay = action.data;
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
      return state;

    case 'SHOPPING_LIST':
      state.config.widgets.shoppingList = action.data;
      return state;

    case 'TODO_LIST':
      state.config.widgets.todoList = action.data;
      return state;

    case 'WEATHER':
      state.config.widgets.weather = action.data;
      return state;

    default:
      return state;
  }
}

export default createStore(reducer);