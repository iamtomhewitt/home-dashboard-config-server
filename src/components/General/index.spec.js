import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import General from '.';

const middlewares = [];
const mockStore = configureStore(middlewares);
const props = {
  general: {
    backgroundColour: '#ffffff',
    dashboardName: 'Tom & Laurens Dashboard',
    title: 'General Settings',
  },
};

describe('<General/>', () => {
  it('renders', () => {
    const store = mockStore({});

    const { getAllByTestId } = render(
      <Provider store={store}>
        <General {...props} />
      </Provider>,
    );

    expect(getAllByTestId('general')).toBeTruthy();
  });
});
