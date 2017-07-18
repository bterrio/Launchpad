import React from 'react';

import styles from './square.css';

/**
 * [Square Render a clickable square]
 * @param       {[type]} props [description]
 * @constructor
 */
function Square(props) {
  let className = props.selected ? styles.square + ' ' + styles.selected : styles.square;

  return (
    <li className={className} onClick={props.onClick}>
        {props.hasLocalFiles ? <img src={`app/assets/${props.name}.png`} alt={props.altText}/> : props.altText}
    </li>
  );
}

module.exports = Square;
