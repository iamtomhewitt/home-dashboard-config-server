import React from 'react';
import PropTypes from 'prop-types';

import BasicItem from '../BasicItem';

const General = ({ general }) => {
  const data = {
    ...general,
    title: 'General Settings',
  };

  return (
    <div key='key' data-test-id='general'>
      <BasicItem key='key' data={data} action='GENERAL' />
    </div>
  );
};

General.propTypes = {
  general: PropTypes.object,
};

export default General;
