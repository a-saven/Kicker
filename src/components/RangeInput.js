import React from 'react';

const RangeInput = ({ name, label, min, max, step, value, meterValue, onChange, unit }) => (
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
      value={meterValue}
    />
    <span className="numbers">
      {value}
      &nbsp;
      {name === 'angle' ? '°' : unit}
    </span>
  </div>
);

export default RangeInput;
