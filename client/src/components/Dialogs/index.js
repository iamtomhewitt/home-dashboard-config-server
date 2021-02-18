import React from 'react'
import BasicItem from '../BasicItem';
import { toSentence, toUpperSnakeCase } from '../../lib';

const Dialogs = ({ dialogs }) => {
  return (
    <div className='items'>
      <h3>Dialogs</h3>
      {dialogs.map(dialog => {
        const { key, value } = dialog;
        const action = toUpperSnakeCase(key);
        value.title = toSentence(key)

        return (
          <div key={key}>
            <BasicItem key={key} data={value} action={action} />
            <hr />
          </div>
        )
      })}
    </div>
  )
}

export default Dialogs;