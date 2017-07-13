import React from 'react';

require('./board.css');
var Square = require('../square/square.js');

/**
 * [Board Render a grid of squares]
 * @constructor
 */
class Board extends React.Component {
  renderSquare(index, name) {
    // add new square state
    if (!this.props.squares[index]) {
      this.props.squares[index] = {selected: false, soundTimer: null};
    }

    let selected = this.props.squares[index].selected;
    return (
      <Square
        index={index}
        selected={selected}
        name={name}
        onClick={() => this.props.onClick(index, name)}
      />
    );
  }

  render() {
    return (
      <div>
        <ul className="board-row">
          {this.renderSquare(0, 'cat')}
          {this.renderSquare(1, 'cricket')}
          {this.renderSquare(2, 'airhorn')}
          {this.renderSquare(3, 'ambulance')}
        </ul>
      </div>
    );
  }
}

module.exports = Board;
