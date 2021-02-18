import React from 'react'
import BasicWidget from './BasicWidget';
import BinDayWidget from './BinDayWidget';
import GmailWidget from './GmailWidget';
import JourneyPlannerWidget from './JourneyPlannerWidget';
import { toUpperSnakeCase } from '../../lib';
import './index.scss';

const Widgets = ({ widgets }) => {
  return (
    <div className='widgets'>
      <h2>Widgets</h2>
      {widgets.map(widget => {
        const { key, value } = widget;
        const action = toUpperSnakeCase(key);

        let component;

        switch (key) {
          case '_id':
            return;

          case 'binDay':
            component = BinDayWidget;
            break;

          case 'gmail':
            component = GmailWidget
            break;

          case 'journeyPlanner':
            component = JourneyPlannerWidget
            break;

          default:
            component = BasicWidget
            break;
        }

        return renderWidget(component, { key, value, action })
      })}
    </div>
  )
}

const renderWidget = (Component, { key, value, action }) => (
  <div key={key}>
    <Component key={key} data={value} action={action} />
    <hr />
  </div>
)

export default Widgets;