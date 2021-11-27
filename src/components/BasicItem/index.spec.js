import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import BasicItem from '.';

const middlewares = [];
const mockStore = configureStore(middlewares);

const props = {
  action: 'An action',
  data: {
    apiKey: 'apikey',
    colour: '#ffffff',
    repeatRate: '30',
    repeatTime: 'minutes',
    sleepEnd: '06:00',
    sleepStart: '23:59',
    textColour: '#ffffff',
    title: 'A title'
  }
}

describe('<BasicItem/>', () => {
  it('renders', () => {
    const store = mockStore({});

    const { getAllByTestId } = render(
      <Provider store={store}>
        <BasicItem {...props} />
      </Provider>
    );

    expect(getAllByTestId('basic-item')).toHaveLength(1);
  })
})