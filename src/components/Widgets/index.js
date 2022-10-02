import React from 'react';
import PropTypes from 'prop-types';

import BasicItem from '../BasicItem';
import BinDay from './BinDay';
import Gmail from './Gmail';
import JourneyPlanner from './JourneyPlanner';
import { toUpperSnakeCase } from '../../lib';

const renderWidget = (Component, { key, value, action }) => <Component key={key} data={value} action={action} />;

const Widgets = ({ widgets }) => (
  <div data-test-id='widgets'>
    {widgets.map((widget) => {
      const { key, value } = widget;
      const action = toUpperSnakeCase(key);

      let component;

      switch (key) {
        case 'binDay':
          component = BinDay;
          break;

        case 'gmail':
          component = Gmail;
          break;

        case 'journeyPlanner':
          component = JourneyPlanner;
          break;

        default:
          component = BasicItem;
          break;
      }

      return renderWidget(component, { key, value, action });
    })}
  </div>
);

Widgets.propTypes = {
  widgets: PropTypes.array,
};

export default Widgets;
