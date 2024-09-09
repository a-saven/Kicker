import React, { Component } from 'react';
import './App.css';
import './inputStyles.css';
import ValueDisplay from './components/ValueDisplay';
import RangeInput from './components/RangeInput';
import SvgDiagram from './components/SvgDiagram';
import Toggle from './components/Toggle';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 1.6,
      angle: 45,
      unit: 'm',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleUnitChange = (unit) => {
    this.setState({ unit });
  };

  size() {
    return 250 / this.cv().foot + 10;
  }

  convertValue(value) {
    console.log('value', value);
    switch (this.state.unit) {
      case 'cm':
        return (value * 100).toFixed(1); // meters to centimeters
      case 'feet':
        return (value * 3.28084).toFixed(2); // meters to feet
      case 'inch':
        return (value * 39.3701).toFixed(1); // meters to inches
      case 'm':
      default:
        return Number(value).toFixed(2); // meters
    }
  }

  cv() {
    const { height, angle } = this.state;
    const drc = 0.0174532925; // degree to radian constant
    const angleRad = drc * angle; // radius angle in radian
    const angleBrad = ((180 - angle) / 2) * drc; // reversed angle in radian

    const radius = Math.round((height / (2 * (Math.sin(angleRad / 2) * Math.sin(angleRad / 2)))) * 100) / 100;
    const length = height / Math.sin(angleRad / 2);
    const foot = height * Math.tan(angleBrad);
    const deepth = radius - radius * Math.sin((90 - angle / 2) * drc);

    return { radius, length, foot, deepth };
  }

  render() {
    const { height, angle } = this.state;
    const size = this.size();
    const scaledHeight = height * size;
    const scaledFoot = this.cv().foot * size;
    const scaledRadius = this.cv().radius * size;

    return (
      <div className="App">
        <div className="container">
          <div className="central">
            <SvgDiagram scaledFoot={scaledFoot} scaledHeight={scaledHeight} scaledRadius={scaledRadius} />
            <div className="displayValues">
              <ValueDisplay label="Radius" value={this.cv().radius} unit="&deg;" className="radiusValue" />
              <ValueDisplay
                label="Length"
                value={this.convertValue(this.cv().foot)}
                unit={this.state.unit}
                className="lengthValue"
              />
              <ValueDisplay
                label="Hypotenuse"
                value={this.convertValue(this.cv().length)}
                unit={this.state.unit}
                className="hypotenuseValue"
              />
              <ValueDisplay
                label="Deepth"
                value={this.convertValue(this.cv().deepth)}
                unit={this.state.unit}
                className="deepthValue"
              />
            </div>
            <RangeInput
              name="angle"
              label="ANGLE"
              min="25"
              max="90"
              step="1"
              value={angle}
              meterValue={angle}
              onChange={this.handleChange}
              å
            />
            <RangeInput
              name="height"
              label="HEIGHT"
              min="0.1"
              max="4"
              step="0.1"
              value={this.convertValue(height)}
              meterValue={height}
              unit={this.state.unit}
              onChange={this.handleChange}
            />
            <Toggle unit={this.state.unit} onUnitChange={this.handleUnitChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
