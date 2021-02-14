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

    default:
      return state;
  }
}

export default createStore(reducer);