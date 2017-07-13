import React from 'react';

require('./square.css');

/**
 * [Square Render a clickable square]
 * @param       {[type]} props [description]
 * @constructor
 */
function Square(props) {
  let className = props.selected ? 'square selected' : 'square';

  return (
    <li className={className} onClick={props.onClick}>
        <img src={require(`../../assets/${props.name}.png`)} alt={props.name}/>
    </li>
  );
}

module.exports = Square;
