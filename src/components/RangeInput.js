import React from 'react';

const RangeInput = ({ name, label, min, max, step, value, onChange }) => (
  <div className="inputs">
    <span className="numbers">{label}</span>
    <input
      name={name}
      className="numbers"
      type="range"
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      value={value}
    />
    <span className="numbers">
      {value}
      {name === 'angle' ? '°' : 'm'}
    </span>
  </div>
);

export default RangeInput;
