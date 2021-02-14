import React from 'react'
import BasicWidget from './BasicWidget';

const camelToUpperSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toUpperCase();

const Widgets = ({ widgets }) => {
  return (
    <div>
      <h3>Widgets</h3>
      {widgets.map(widget => {
        const { key, data } = widget;
        if (key === '_id') return;

        return <BasicWidget key={key} data={data} action={camelToUpperSnakeCase(key)} />
      })}
    </div>
  )
}

export default Widgets;