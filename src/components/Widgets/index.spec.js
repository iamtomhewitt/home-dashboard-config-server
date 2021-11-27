import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import Widgets from '.';

const middlewares = [];
const mockStore = configureStore(middlewares);

const props = {
  widgets: [
    {
      key: 'bbcNews',
      value: {
        apiKey: '1',
        colour: '#bb1919',
        repeatRate: '30',
        repeatTime: 'minutes',
        secondsBetweenArticles: 60,
        sleepEnd: '05:00',
        sleepStart: '23:59',
        textColour: '#ffffff',
        title: 'BBC News',
      },
    },
    {
      key: 'binDay',
      value: {
        bins: [],
        colour: '#bb1919',
        noBinColour: '#bb1919',
        repeatRate: '30',
        repeatTime: 'minutes',
        sleepEnd: '05:00',
        sleepStart: '23:59',
        textColour: '#ffffff',
        title: 'BBC News',
      },
    },
    {
      key: 'gmail',
      value: [{
        apiKey: 'api',
        colour: '#4285F4',
        gmailAddress: 'a@gmail.com',
        numberOfEvents: 25,
        repeatRate: 3,
        repeatTime: 'hours',
        sleepEnd: '07:00',
        sleepStart: '22:30',
        textColour: '#FFFFFF',
        title: "A's Calendar",
        titleColour: '#FFFFFF',
      }],
    },
    {
      key: 'journeyPlanner',
      value: {
        apiKey: 'key',
        colour: '#384a8c',
        journeys: [],
        repeatRate: 15,
        repeatTime: 'minutes',
        sleepEnd: '07:00',
        sleepStart: '23:00',
        textColour: '#ffffff',
        title: 'Journey Planner',
        titleColour: '#ffffff',
      },
    },
  ],
};

describe('<Widgets/>', () => {
  it('renders', () => {
    const store = mockStore({
      config: {
        widgets: {
          binDay: {
            ...props.widgets[1].value,
          },
        },
      },
    });

    const { getAllByTestId } = render(
      <Provider store={store}>
        <Widgets {...props} />
      </Provider>,
    );

    expect(getAllByTestId('widgets')).toHaveLength(1);
  });
});
