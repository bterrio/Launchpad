import React from 'react';

import './board.css';
var Square = require('../square/square.js');
var CustomSquare = require('../square/customSquare.js')

/**
 * [Board Render a grid of squares]
 * @constructor
 */
class Board extends React.Component {
  renderSquare(name, hasLocalFiles) {
    if (!this.props.squares[name]) {
      return null;
    }

    let selected = this.props.squares[name].selected;
    let altText = this.props.squares[name].altText;
    return (
      <Square
        selected={selected}
        name={name}
        hasLocalFiles={hasLocalFiles}
        altText = {altText}
        onClick={() => this.props.onClick(name)}
      />
    );
  }

  renderCustomSquare(name) {
    let square = this.props.squares[name];
    let context = this;
    return (
      square ?
        context.renderSquare(name, false)
      :
        <CustomSquare
          onFileChosen={function(value) { context.props.onFileChosen(name, value) } }
        />
    );
  }

  render() {
    return (
      <div>
        <ul className='board-row'>
          {this.renderSquare('cat', true)}
          {this.renderSquare('cricket', true)}
          {this.renderSquare('airhorn', true)}
          {this.renderSquare('ambulance', true)}
          {this.renderSquare('bell', true)}
          {this.renderSquare('slidewhistle', true)}
          {this.renderCustomSquare('custom1')}
          {this.renderCustomSquare('custom2')}
          {this.renderCustomSquare('custom3')}
        </ul>
      </div>
    );
  }
}

module.exports = Board;
