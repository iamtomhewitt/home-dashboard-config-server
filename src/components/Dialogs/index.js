import React from 'react';
import PropTypes from 'prop-types';

import BasicItem from '../BasicItem';
import { toSentence, toUpperSnakeCase } from '../../lib';

const Dialogs = ({ dialogs }) => (
  <div data-test-id='dialogs'>
    {dialogs.map((dialog) => {
      const { key, value } = dialog;
      const action = `DIALOG_${toUpperSnakeCase(key)}`;
      value.title = toSentence(key);

      return (
        <div key={key}>
          <BasicItem key={key} data={value} action={action} />
        </div>
      );
    })}
  </div>
);

Dialogs.propTypes = {
  dialogs: PropTypes.array,
};

export default Dialogs;
