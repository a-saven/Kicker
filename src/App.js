import React, { Component } from 'react';
import './App.css';
import ValueDisplay from './components/ValueDisplay';
import RangeInput from './components/RangeInput';
import SvgDiagram from './components/SvgDiagram';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 1.6,
      angle: 45,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  size() {
    return 250 / this.cv().foot + 10;
  }

  cv() {
    const { height, angle } = this.state;
    const drc = 0.0174532925; // degree to radian constant
    const angleRad = drc * angle; // radius angle in radian
    const angleBrad = ((180 - angle) / 2) * drc; // reversed angle in radian

    const radius = Math.round((height / (2 * (Math.sin(angleRad / 2) * Math.sin(angleRad / 2)))) * 100) / 100;
    const length = (height / Math.sin(angleRad / 2)).toFixed(2);
    const foot = (height * Math.tan(angleBrad)).toFixed(2);
    const deepth = (radius - radius * Math.sin((90 - angle / 2) * drc)).toFixed(2);

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
              <ValueDisplay label="Radius" value={this.cv().radius} unit="m" className="radiusValue" />
              <ValueDisplay label="Length" value={this.cv().foot} unit="m" className="footValue" />
              <ValueDisplay label="Hypotenuse" value={this.cv().length} unit="m" className="lengthValue" />
              <ValueDisplay label="Deepth" value={this.cv().deepth} unit="m" className="deepthValue" />
            </div>
            <RangeInput
              name="angle"
              label="ANGLE"
              min="25"
              max="90"
              step="1"
              value={angle}
              onChange={this.handleChange}
            />
            <RangeInput
              name="height"
              label="HEIGHT"
              min="0.1"
              max="4"
              step="0.1"
              value={height}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
