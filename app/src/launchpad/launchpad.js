import React from 'react';

require('./launchpad.css');
var Board = require('../board/board.js');
var Slider = require('../slider/slider.js');
var SoundTimer = require('../soundTimer.js');

/**
 * [Launchpad The overall launchpad object]
 * @type {Object}
 */
class Launchpad extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: [],
      frequency: 2,
      probability: 100,
      volume: 50,
    }
  }

  handleClick(index, name) {
    const squares = this.state.squares.slice();
    squares[index].selected = !squares[index].selected;

    if (!squares[index].soundTimer) {
      let soundTimer = new SoundTimer(name, this.state.frequency, this.state.probability, this.state.volume);
      soundTimer.Start();
      squares[index].soundTimer = soundTimer;
    } else {
      squares[index].soundTimer.Stop();
      squares[index].soundTimer = null;
    }

    this.setState({squares: squares});
  }

  handleSlide(sliderName, value) {
    let squares = this.state.squares.slice();
    for (let i=0; i < squares.length; i++) {
      if (squares[i].soundTimer) {
        squares[i].soundTimer.Stop();
        squares[i].soundTimer[sliderName] = value;
        squares[i].soundTimer.Start();
      }
    }

    this.setState({
        squares: squares,
        [sliderName]: value
      });
  }

  render() {
    return (
      <div>
        <div className="sliderPanel">
          <Slider
            propertyName="frequency"
            labelText="Frequency"
            unit="seconds"
            value={this.state.frequency}
            min="1"
            max="600"
            step="1"
            onSlide={(name, value) => this.handleSlide(name, value)}
          />
          <Slider
            propertyName="probability"
            labelText="Probability"
            unit="%"
            value={this.state.probability}
            min="1"
            max="100"
            step="1"
            onSlide={(name, value) => this.handleSlide(name, value)}
          />
          <Slider
            propertyName="volume"
            labelText="Volume"
            unit="%"
            value={this.state.volume}
            min="1"
            max="100"
            step="1"
            onSlide={(name, value) => this.handleSlide(name, value)}
          />
        </div>
        <div className="launchpad">
          <Board
            squares={this.state.squares}
            onClick={(index, name) => this.handleClick(index, name)}
          />
        </div>
      </div>
    );
  }
}

module.exports = Launchpad;
