import React, { Component } from 'react';
import './App.css';

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
            <div className="experiments">
              <svg viewBox="0 0 500 300" height="100%" width="100%" preserveAspectRatio="xMidYMid meet">
                <rect width={scaledFoot} height={scaledHeight} className="svg-rect" />
                <line x1="0" y1="0" x2="0" y2={scaledHeight} strokeWidth="8" stroke="blue" />
                <line x1="0" y1="0" x2={scaledFoot} y2="0" strokeWidth="8" stroke="#1ac62b" />
                <path
                  d={`M${scaledFoot},${scaledRadius} v-${scaledRadius} A${scaledRadius},${scaledRadius} 0 0,0 0,${scaledHeight} z`}
                  fill="white"
                  stroke="black"
                  strokeWidth="3"
                />
                <line x1="0" y1={scaledHeight} x2={scaledFoot} y2="0" strokeWidth="2" stroke="#ff33cc" />
                <line x1={scaledFoot} y1="0" x2={scaledFoot} y2={scaledRadius} stroke="#ff8110" strokeWidth="3" />
                <line x1="0" y1={scaledHeight} x2={scaledFoot} y2={scaledRadius} stroke="#ff8110" strokeWidth="3" />
                Sorry, your browser does not support inline SVG.
              </svg>
            </div>
            <div className="displayValues">
              <div className="radiusValue">
                Radius
                <br /> {this.cv().radius}m
              </div>
              <div className="footValue">
                Length
                <br /> {this.cv().foot}m
              </div>
              <div className="lengthValue">
                Hypotenuse
                <br /> {this.cv().length}m
              </div>
              <div className="deepthValue">
                Depth
                <br /> {this.cv().deepth}m
              </div>
            </div>
            <div className="inputs">
              <span className="numbers">ANGLE</span>
              <input
                name="angle"
                className="numbers"
                type="range"
                min="25"
                max="90"
                step="1"
                onChange={this.handleChange}
                value={angle}
              />
              <span className="numbers">{angle}°</span>
            </div>
            <div className="inputs input-label">
              <span className="numbers">HEIGHT</span>
              <input
                name="height"
                type="range"
                min="0.1"
                max="4"
                step="0.1"
                onChange={this.handleChange}
                value={height}
              />
              <span className="numbers">{height}m</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
