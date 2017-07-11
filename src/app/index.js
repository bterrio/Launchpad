import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * [Square Render a clickable square]
 * @param       {[type]} props [description]
 * @constructor
 */
function Square(props) {
  let className = props.selected ? 'square selected' : 'square';

  return (
    <li className={className} onClick={props.onClick}>
        <img src={require(`./assets/${props.name}.png`)} alt={props.name}/>
    </li>
  );
}

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
        </ul>
      </div>
    );
  }
}

var SoundTimer = function (soundName, frequency, probability, volume) {
  this.soundName = soundName || null;
  this.frequency = frequency || 2000;
  this.probability = probability || 100;
  this.volume = volume || 50;

  this.timerId = 0;

  this.Start = function() {
    // wait before the first tick
    this.timerId = setTimeout(() => { this.Tick(); }, this.frequency * 1000);
  };

  this.Tick = function() {
    if (this.probability >= Math.random() * 100) {
      let audio = new Audio(require(`./assets/${this.soundName}.mp3`));
      audio.volume = this.volume / 100;
      audio.play();
    }

    this.timerId = setTimeout(() => { this.Tick(); }, this.frequency * 1000);
  }

  this.Stop = function() {
    clearTimeout(this.timerId);
  };
}

/**
 * [Slider Render a slider]
 * @param       {[type]} props [description]
 * @constructor
 */
function Slider(props) {
  let slide = function (event) {
    props.onSlide(props.propertyName, event.target.value);
  }

  return (
    <div className="sliderContainer">
      <span>{props.labelText}:</span>
      <input className="slider" type="range" min={props.min} max={props.max} step={props.step} value={props.value} onChange={slide} />
      <span>{props.value} {props.unit}</span>
    </div>
  );
}

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
      <div className="launchpad">
        <Board
          squares={this.state.squares}
          onClick={(index, name) => this.handleClick(index, name)}
        />
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
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Launchpad />,
  document.getElementById('root')
);
