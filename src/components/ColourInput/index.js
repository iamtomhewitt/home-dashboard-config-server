import React from 'react';
import InputColor from "react-input-color";

const ColourInput = ({ value, onChange }) => (
  <InputColor
    initialValue={value}
    onChange={onChange}
    style={{
      backgroundColor: 'transparent',
      height: '25px',
      margin: '5px 0',
      minWidth: '260px',
      verticalAlign: 'middle',
    }}
  />
)

export default ColourInput;