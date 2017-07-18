import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
var Launchpad = require('./launchpad/launchpad.js')

// ========================================

ReactDOM.render(
  <div>
    <h1 className={styles.title}>Trendy Launchpad</h1>
    <Launchpad />
  </div>,
  document.getElementById('root')
);
