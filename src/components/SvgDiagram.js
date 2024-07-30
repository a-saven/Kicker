import React from 'react';

const SvgDiagram = ({ scaledFoot, scaledHeight, scaledRadius }) => (
  <div className="experiments">
    <svg viewBox="0 0 500 300" height="100%" width="100%" preserveAspectRatio="xMidYMid meet">
      <rect width={scaledFoot} height={scaledHeight} className="svg-rect" />
      <line x1="0" y1="0" x2="0" y2={scaledHeight} strokeWidth="8" stroke="#0033ff" />
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
);

export default SvgDiagram;
