import React from 'react'
import BasicWidget from './BasicWidget';
import BinDayWidget from './BinDayWidget';
import GmailWidget from './GmailWidget';

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
            return <BinDayWidget key={key} data={value} action={action} />

          case 'gmail':
            return <GmailWidget key={key} data={value} action={action} />

          default:
            return <BasicWidget key={key} data={value} action={action} />
        }
      })}
    </div>
  )
}

export default Widgets;