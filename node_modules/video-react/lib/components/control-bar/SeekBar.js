import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import Slider from '../Slider';
import PlayProgressBar from './PlayProgressBar';
import LoadProgressBar from './LoadProgressBar';
import MouseTimeDisplay from './MouseTimeDisplay';
import { formatTime } from '../../utils';

const propTypes = {
  player: PropTypes.object,
  mouseTime: PropTypes.object,
  actions: PropTypes.object,
  className: PropTypes.string,
  keyValue: PropTypes.object
};

export default class SeekBar extends Component {

  constructor(props, context) {
    super(props, context);

    this.getPercent = this.getPercent.bind(this);
    this.getPercentByArg = this.getPercentByArg.bind(this);
    this.getNewTime = this.getNewTime.bind(this);
    this.stepForward = this.stepForward.bind(this);
    this.stepBack = this.stepBack.bind(this);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  /**
   * Get percentage of video played
   *
   * @return {Number} Percentage played
   * @method getPercent
   */
  getPercent() {
    const { currentTime, seekingTime, duration } = this.props.player;
    //console.log("in getPercent",this.props.player);
    const time = seekingTime || currentTime;
    const percent = time / duration;
    return percent >= 1 ? 1 : percent;
  }
  getPercentByArg(Time){
    const { currentTime, seekingTime, duration } = this.props.player;
    if(typeof Time !== 'number'){
      return 0;
    }
    const time = Time || 0;
    const percent = time / duration;
    return percent >= 1 ? 1 : percent;

  }
  getNewTime(event) {
    const { player: { duration } } = this.props;
    const distance = this.slider.calculateDistance(event);
    const newTime = distance * duration;

    // Don't let video end while scrubbing.
    return newTime === duration ? newTime - 0.1 : newTime;
  }

  handleMouseDown() {
  }

  handleMouseUp(event) {
    const { actions } = this.props;
    const newTime = this.getNewTime(event);
    // Set new time (tell video to seek to new time)
    actions.seek(newTime);
    actions.handleEndSeeking(newTime);
  }

  handleMouseMove(event) {
    const { actions } = this.props;
    const newTime = this.getNewTime(event);
    actions.handleSeekingTime(newTime);
  }


  stepForward() {
    const { actions } = this.props;
    actions.forward(5);
  }

  stepBack() {
    const { actions } = this.props;
    actions.replay(5);
  }

  render() {
    let timePositions = [];
    for (let key in this.props.keyValue){
      let tmp = key.split(':');
      let num = parseInt(tmp[0])*60+parseInt(tmp[1]);
      timePositions.push(this.getPercentByArg(num));
    }
    const { player: { currentTime, seekingTime, duration, buffered }, mouseTime } = this.props;
    const time = seekingTime || currentTime;
    //console.log('SeekBar getPercentByArg', this.getPercentByArg(30));
    let test = this.getPercentByArg(30);
    let tmpChildren = timePositions.map(function(data){
      return <div style={{"backgroundColor":"red", "left":data*100+"%", "width":"2px", "height":'0.3em', "position":"absolute"}}></div>
    });
    return (
      <Slider
        ref={(input) => {
          this.slider = input;
        }}
        label="video progress bar"
        className={classNames('video-react-progress-holder', this.props.className)}
        valuenow={(this.getPercent() * 100).toFixed(2)}
        valuetext={formatTime(time, duration)}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        getPercent={this.getPercent}
        getPercentByArg={this.getPercentByArg}
        stepForward={this.stepForward}
        stepBack={this.stepBack}
      >
        <LoadProgressBar
          buffered={buffered}
          currentTime={time}
          duration={duration}
        />
        <MouseTimeDisplay
          duration={duration}
          mouseTime={mouseTime}
          keyValue={this.props.keyValue}
        />
        <PlayProgressBar
          currentTime={time}
          duration={duration}
          positions={timePositions}
        />
        {tmpChildren}
      </Slider>
    );
  }
}

SeekBar.propTypes = propTypes;
