import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import Gmail from '.';

const middlewares = [];
const mockStore = configureStore(middlewares);

let props;

describe('<Gmail/>', () => {
  beforeEach(() => {
    props = {
      data: [{
        apiKey: '12345',
        colour: '#E67C73',
        gmailAddress: 'someone@gmail.com',
        numberOfEvents: 25,
        repeatRate: 3,
        repeatTime: 'hours',
        sleepEnd: '07:00',
        sleepStart: '22:30',
        textColour: '#FFFFFF',
        title: "A's Calendar",
        titleColour: '#ffffff',
      }, {
        apiKey: '12345',
        colour: '#E67C73',
        gmailAddress: 'someoneelse@gmail.com',
        numberOfEvents: 25,
        repeatRate: 3,
        repeatTime: 'hours',
        sleepEnd: '07:00',
        sleepStart: '22:30',
        textColour: '#FFFFFF',
        title: "B's Calendar",
        titleColour: '#ffffff',
      }],
      action: 'An Action',
    };
  });

  it('renders', () => {
    const store = mockStore({});

    const { getAllByTestId } = render(
      <Provider store={store}>
        <Gmail {...props} />
      </Provider>,
    );

    expect(getAllByTestId('gmail')).toHaveLength(1);
  });

  it('should add a gmail address', () => {
    const store = mockStore({});

    const { getAllByTestId, getByTestId } = render(
      <Provider store={store}>
        <Gmail {...props} />
      </Provider>,
    );

    expect(getAllByTestId('gmail-item')).toHaveLength(2);
    fireEvent.click(getByTestId('gmail-add-gmail'));
    expect(getAllByTestId('gmail-item')).toHaveLength(3);
  });

  it('should remove a gmail address', () => {
    const store = mockStore({});

    const { getAllByTestId } = render(
      <Provider store={store}>
        <Gmail {...props} />
      </Provider>,
    );

    expect(getAllByTestId('gmail-item')).toHaveLength(2);
    fireEvent.click(getAllByTestId('gmail-remove-gmail')[0]);
    expect(getAllByTestId('gmail-item')).toHaveLength(1);
  });
});
