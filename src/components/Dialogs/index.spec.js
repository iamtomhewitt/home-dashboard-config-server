import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import Dialogs from '.';

const middlewares = [];
const mockStore = configureStore(middlewares);
const props = {
  dialogs: [{
    key: 'addNewRecipe',
    value: {
      mainColour: '#58bac8',
      textColour: '#ffffff',
      title: 'Add New Recipe',
    },
  }, {
    key: 'confirm',
    value: {
      mainColour: '#309f36',
      textColour: '#ffffff',
      title: 'Confirm',
    },
  }],
};

describe('<Dialogs/>', () => {
  it('renders', () => {
    const store = mockStore({});

    const { getAllByTestId } = render(
      <Provider store={store}>
        <Dialogs {...props} />
      </Provider>,
    );

    expect(getAllByTestId('dialogs')).toBeTruthy();
  });
});
