import React from 'react';

import styles from './launchpad.css';
var Board = require('../board/board.js');
var Slider = require('../slider/slider.js');
var SoundTimer = require('../soundTimer.js');

require('app/assets/airhorn.mp3');
require('app/assets/ambulance.mp3');
require('app/assets/bell.mp3');
require('app/assets/cat.mp3');
require('app/assets/cricket.mp3');
require('app/assets/slidewhistle.mp3');
const localSounds = ['airhorn', 'ambulance', 'bell', 'cat', 'cricket', 'slidewhistle'];

/**
 * [Launchpad The overall launchpad object]
 * @type {Object}
 */
class Launchpad extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: {},
      frequency: 2,
      probability: 100,
      volume: 50,
    }

    // initialize state for local sound squares
    for (let i=0; i < localSounds.length; i++) {
      let localSound = localSounds[i];
      this.state.squares[localSound] = {selected: false, soundTimer: null, soundFilePath: `app/assets/${localSound}.mp3`, altText: localSound};
    }
  }

  handleClick(name) {
    const squares = Object.assign({}, this.state.squares);
    squares[name].selected = !squares[name].selected;

    if (!squares[name].soundTimer) {
      let soundTimer = new SoundTimer(squares[name].soundFilePath, this.state.frequency, this.state.probability, this.state.volume);
      soundTimer.Start(true);
      squares[name].soundTimer = soundTimer;
    } else {
      squares[name].soundTimer.Stop();
      squares[name].soundTimer = null;
    }

    this.setState({squares: squares});
  }

  handleFileChosen(name, value) {
    const squares = Object.assign({}, this.state.squares);

    let filePath = URL.createObjectURL(value);
    squares[name] = {selected: false, soundTimer: null, soundFilePath: filePath, altText: value.name};

    this.setState({squares: squares});
  }

  handleSlide(sliderName, value) {
    const squares = Object.assign({}, this.state.squares);
    for (let key in squares) {
      if (squares[key].soundTimer) {
        squares[key].soundTimer.Stop();
        squares[key].soundTimer[sliderName] = value;
        squares[key].soundTimer.Start(false);
      }
    }

    this.setState({
        squares: squares,
        [sliderName]: value
      });
  }

  render() {
    return (
      <div className={styles.launchpad}>
        <div className={styles.sliderPanel}>
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
        <div className={styles.boardPanel}>
          <Board
            squares={this.state.squares}
            onClick={(name) => this.handleClick(name)}
            onFileChosen={(name, value) => this.handleFileChosen(name, value)}
          />
        </div>
      </div>
    );
  }
}

module.exports = Launchpad;
