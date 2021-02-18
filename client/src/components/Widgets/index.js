import React from 'react'
import BasicWidget from './BasicWidget';
import BinDayWidget from './BinDayWidget';
import GmailWidget from './GmailWidget';
import JourneyPlannerWidget from './JourneyPlannerWidget';

const camelToUpperSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toUpperCase();

const Widgets = ({ widgets }) => {
  return (
    <div className='widgets'>
      <h2>Widgets</h2>
      {widgets.map(widget => {
        const { key, value } = widget;
        const action = camelToUpperSnakeCase(key);

        switch (key) {
          case '_id':
            return;

          case 'binDay':
            return renderWidget(BinDayWidget, { key, value, action })

          case 'gmail':
            return renderWidget(GmailWidget, { key, value, action })

          case 'journeyPlanner':
            return renderWidget(JourneyPlannerWidget, { key, value, action })

          default:
            return renderWidget(BasicWidget, { key, value, action })
        }
      })}
    </div>
  )
}

const renderWidget = (Component, { key, value, action }) => (
  <>
    <Component key={key} data={value} action={action} />
    <hr />
  </>
)

export default Widgets;