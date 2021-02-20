import React from 'react';
import PropTypes from 'prop-types';

import BasicItem from '../BasicItem';
import BinDay from './BinDay';
import Gmail from './Gmail';
import JourneyPlanner from './JourneyPlanner';
import { toUpperSnakeCase } from '../../lib';

const renderWidget = (Component, { key, value, action }) => (
  <div key={key}>
    <Component key={key} data={value} action={action} />
    <hr />
  </div>
);

const Widgets = ({ widgets }) => (
  <div className="items">
    <h2>Widgets</h2>
    {widgets.map((widget) => {
      const { key, value } = widget;
      const action = toUpperSnakeCase(key);

      let component;

      switch (key) {
      case '_id':
        return null;

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
