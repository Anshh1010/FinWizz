import React from 'react';
import userAvatar from '../../assets/images/userAvatar.png';
import '../../assets/css/analytics.css';

function PerformanceCard2(props) {
  return (
    <div className='performance-card'>
      <img src={userAvatar} className='col-sm-1' />
      <div className='officer-data-p'>
        <div className='officer-data col-sm-10'>
          <div>{props.name}</div>
          <div className='designation-data'>
            <div>
              {props.badge}
            </div>
            ,&nbsp;<div>{props.position}</div>
          </div>
        </div>
        <div className='time-data col-sm-1' style={{color:'red'}}>
        {!props.totalAttended ? 0 : props.totalAttended}/{!props.totalSessions ? 0 : props.totalSessions}
        </div>
      </div>
    </div>
  );
}

export default PerformanceCard2;
