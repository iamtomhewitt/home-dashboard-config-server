import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';

import BinDay from '.';

const middlewares = [];
const mockStore = configureStore(middlewares);

const props = {
  data: {
    bins: [{
      binColour: '#66BB6A',
      firstDate: '13-08-2021',
      name: 'Green',
      repeatRateInDays: 14,
    }, {
      binColour: '#00FF00',
      firstDate: '14-08-2021',
      name: 'Red',
      repeatRateInDays: 14,
    }],
    colour: '#03a9f4',
    noBinColour: '#03a9f4',
    repeatRate: 2,
    repeatTime: 'hours',
    sleepEnd: '00:30',
    sleepStart: '23:59',
    textColour: '#ffffff',
    title: 'Bin Day',
  },
  action: 'An Action',
};

describe('<BinDay/>', () => {
  it('renders', () => {
    const store = mockStore({
      config: {
        widgets: {
          binDay: {
            ...props.data,
          },
        },
      },
    });

    const { getAllByTestId } = render(
      <Provider store={store}>
        <BinDay {...props} />
      </Provider>,
    );

    expect(getAllByTestId('bin-day')).toHaveLength(1);
  });

  it('should add a bin', () => {
    const store = mockStore({
      config: {
        widgets: {
          binDay: {
            ...props.data,
          },
        },
      },
    });

    const { getAllByTestId, getByTestId } = render(
      <Provider store={store}>
        <BinDay {...props} />
      </Provider>,
    );

    expect(getAllByTestId('bin-day-bin')).toHaveLength(2);
    fireEvent.click(getByTestId('bin-day-add-bin'));
    expect(getAllByTestId('bin-day-bin')).toHaveLength(3);
  });

  it('should remove a bin', async () => {
    const store = mockStore({
      config: {
        widgets: {
          binDay: {
            ...props.data,
          },
        },
      },
    });

    const { getAllByTestId } = render(
      <Provider store={store}>
        <BinDay {...props} />
      </Provider>,
    );

    await waitFor(() => {
      expect(getAllByTestId('bin-day-bin')).toHaveLength(2);
      fireEvent.click(getAllByTestId('bin-day-remove-bin')[0]);
      expect(getAllByTestId('bin-day-bin')).toHaveLength(1);
    });
  });
});
