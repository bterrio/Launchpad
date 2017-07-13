import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css');
var Launchpad = require('./launchpad/launchpad.js')

// ========================================

ReactDOM.render(
  <Launchpad />,
  document.getElementById('root')
);
