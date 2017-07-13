import React from 'react';

require('./slider.css');

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

module.exports = Slider;
