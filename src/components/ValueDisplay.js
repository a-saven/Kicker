import React from 'react';

const ValueDisplay = ({ label, value, unit, className }) => (
  <div className={className}>
    {label}
    <br />
    {value} &nbsp;
    {unit}
  </div>
);

export default ValueDisplay;
