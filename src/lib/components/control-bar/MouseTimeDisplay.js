import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { formatTime } from '../../utils';

function MouseTimeDisplay({ duration, mouseTime,keyValue, className }) {
  if (!mouseTime.time) {
    return null;
  }

  const time = formatTime(mouseTime.time, duration);
  let parse = function(_time){
    let tmp = _time.split(':');
    return parseInt(tmp[0])*60+parseInt(tmp[1]);
  }
  let _time = time;
  let tmptime = parse(time);
   //console.log('MouseTimeDisplay',keyValue);
    for (let key in keyValue){
        //console.log(key);
        //console.log(keyValue[key]);
        if(parse(key) === tmptime){
            _time = keyValue[key];
            break;
        }
    }
  
  return (
    <div
      className={classNames('video-react-mouse-display', className)}
      style={{
        left: `${mouseTime.position}px`,
      }}
      data-current-time={_time}
    />
  );
}

MouseTimeDisplay.propTypes = {
  duration: PropTypes.number,
  mouseTime: PropTypes.object,
  className: PropTypes.string,
  keyValue: PropTypes.object
};

export default MouseTimeDisplay;
