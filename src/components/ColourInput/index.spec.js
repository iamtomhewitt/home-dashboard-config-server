import React from 'react';
import { render } from '@testing-library/react';

import ColourInput from '.';

const props = {
  value: '#ffffff',
  onChange: jest.fn(),
};

describe('<ColourInput/>', () => {
  it('renders', () => {
    const { getByText } = render(<ColourInput {...props} />);
    expect(getByText('Hex')).toBeTruthy();
  });
});
