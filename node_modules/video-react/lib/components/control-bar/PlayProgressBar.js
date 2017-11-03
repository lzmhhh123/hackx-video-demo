import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { formatTime } from '../../utils';

const propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  percentage: PropTypes.string,
  className: PropTypes.string,
  positions: PropTypes.array
};
const defaultProps = {
  positions: []
};
// Shows play progress
export default function PlayProgressBar({ currentTime, duration, percentage, className, positions}) {
  let tmpChildren = positions.map(function(data){
    return <div style={{"backgroundColor":"red", "left":data*100+"%", "width":"2px", "height":'0.3em', "position":"absolute"}}></div>
  });
  return (
    <div
      data-current-time={formatTime(currentTime, duration)}
      className={classNames('video-react-play-progress video-react-slider-bar', className)}
      style={{
        width: percentage,
      }}
    >
      <span className="video-react-control-text"><span>Progress</span>: {percentage}</span>
      
    </div>
  );
}

PlayProgressBar.propTypes = propTypes;
PlayProgressBar.defaultProps = defaultProps;
