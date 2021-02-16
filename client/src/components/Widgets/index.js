import React from 'react'
import BasicWidget from './BasicWidget';
import BinDayWidget from './BinDayWidget';

const camelToUpperSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toUpperCase();

const Widgets = ({ widgets }) => {
  return (
    <div>
      <h3>Widgets</h3>
      {widgets.map(widget => {
        const { key, data } = widget;
        const action = camelToUpperSnakeCase(key);
        
        if (key === '_id') return;

        if (key === 'binDay') {
          return <BinDayWidget data={data} action={action} />
        }

        return <BasicWidget key={key} data={data} action={action} />
      })}
    </div>
  )
}

export default Widgets;