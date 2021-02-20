import React from 'react';
import PropTypes from 'prop-types';

import BasicItem from '../BasicItem';
import { toSentence, toUpperSnakeCase } from '../../lib';

const Dialogs = ({ dialogs }) => (
  <div className="items">
    <h2>Dialogs</h2>
    {dialogs.map((dialog) => {
      const { key, value } = dialog;
      const action = `DIALOG_${toUpperSnakeCase(key)}`;
      value.title = toSentence(key);

      return (
        <div key={key}>
          <BasicItem key={key} data={value} action={action} />
          <hr />
        </div>
      );
    })}
  </div>
);

Dialogs.propTypes = {
  dialogs: PropTypes.array,
};

export default Dialogs;
