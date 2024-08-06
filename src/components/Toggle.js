import React from 'react';

class Toggle extends React.Component {
  handleToggle = (e) => {
    const unit = e.target.value;
    this.props.onUnitChange(unit);
  };

  render() {
    const unit = this.props.unit || 'm';
    console.log('unit', unit);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <label>
          <input type="radio" name="unit" value="m" onChange={this.handleToggle} checked={unit === 'm'} />
          Meters (m)
        </label>
        <label>
          <input type="radio" name="unit" value="cm" onChange={this.handleToggle} checked={unit === 'cm'} />
          Centimeters (cm)
        </label>
        <label>
          <input type="radio" name="unit" value="feet" onChange={this.handleToggle} checked={unit === 'feet'} />
          Feet (ft)
        </label>
        <label>
          <input type="radio" name="unit" value="inch" onChange={this.handleToggle} checked={unit === 'inch'} />
          Inches (in)
        </label>
      </div>
    );
  }
}

export default Toggle;
