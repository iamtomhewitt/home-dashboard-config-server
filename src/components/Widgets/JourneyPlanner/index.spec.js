import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import JourneyPlanner from '.';

const middlewares = [];
const mockStore = configureStore(middlewares);

const props = {
  data: {
    apiKey: 'key',
    colour: '#384a8c',
    journeys: [{
      endPoint: '53.655842,-1.819090',
      name: 'To',
      startPoint: '53.794040,-1.325840',
    }, {
      endPoint: '53.655842,-1.819090',
      name: 'From',
      startPoint: '53.794040,-1.325840',
    }],
    repeatRate: 15,
    repeatTime: 'minutes',
    sleepEnd: '07:00',
    sleepStart: '23:00',
    textColour: '#ffffff',
    title: 'Journey Planner',
    titleColour: '#ffffff',
  },
  action: 'An action',
};

describe('<JourneyPlanner/>', () => {
  it('renders', () => {
    const store = mockStore({});

    const { getAllByTestId } = render(
      <Provider store={store}>
        <JourneyPlanner {...props} />
      </Provider>,
    );

    expect(getAllByTestId('journeys')).toHaveLength(1);
  });

  it('should add a journey', () => {
    const store = mockStore({});

    const { getAllByTestId, getByTestId } = render(
      <Provider store={store}>
        <JourneyPlanner {...props} />
      </Provider>,
    );

    expect(getAllByTestId('journey-item')).toHaveLength(2);
    fireEvent.click(getByTestId('journey-add-journey'));
    expect(getAllByTestId('journey-item')).toHaveLength(3);
  });

  it('should remove a journey address', () => {
    const store = mockStore({});

    const { getAllByTestId } = render(
      <Provider store={store}>
        <JourneyPlanner {...props} />
      </Provider>,
    );

    expect(getAllByTestId('journey-item')).toHaveLength(2);
    fireEvent.click(getAllByTestId('journey-remove-journey')[0]);
    expect(getAllByTestId('journey-item')).toHaveLength(1);
  });
});
