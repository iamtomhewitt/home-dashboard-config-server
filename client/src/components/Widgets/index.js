import React from 'react'
import BasicWidget from './BasicWidget';
import BinDayWidget from './BinDayWidget';
import './index.scss';

const camelToUpperSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toUpperCase();

const Widgets = ({ widgets }) => {
  return (
    <div className='widgets'>
      <h2>Widgets</h2>
      {widgets.map(widget => {
        const { key, data } = widget;
        const action = camelToUpperSnakeCase(key);

        if (key === '_id') return;

        switch (key) {
          case '_id':
            return;

          case 'binDay':
            return <BinDayWidget key={key} data={data} action={action} />

          default:
            return <BasicWidget key={key} data={data} action={action} />
        }
      })}
    </div>
  )
}

export default Widgets;