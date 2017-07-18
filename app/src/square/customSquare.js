import React from 'react';

import styles from './square.css';

/**
 * [Square Render a clickable square]
 * @param       {[type]} props [description]
 * @constructor
 */
class CustomSquare extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className={styles.customSquare + ' ' + styles.square}>
          <input
            className={styles.fileInput}
            type='file'
            accept='audio/*'
            ref={(input) => { this.fileInput = input; }}
            onChange={(event) => { this.props.onFileChosen(event.target.files[0]); }} />
          <button onClick={ () => { this.fileInput.click() } }>Choose File</button>
      </li>
    );
  }
}

module.exports = CustomSquare;
