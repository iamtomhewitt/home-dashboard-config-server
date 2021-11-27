import React from 'react';
import { render } from '@testing-library/react';

import LoadingIcon from '.';

const props = {
  value: '#ffffff',
  onChange: jest.fn(),
};

describe('<LoadingIcon/>', () => {
  it('renders', () => {
    const { getAllByTestId } = render(<LoadingIcon {...props} />);
    expect(getAllByTestId('loading-icon')).toBeTruthy();
  });
});
