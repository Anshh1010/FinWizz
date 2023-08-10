import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "../../assets/css/sos.css";
import ShowMap from './map';
import AdminIdContext from "../context/adminContext";

const SupervisionCard = (props) => {
  const { adminId } = useContext(AdminIdContext);
  const { policeName, badgeId, sessionDate, startTime, endTime, sessionLocation, checkIn, checkPointAttended, profilePic, latitude, longitude} = props;
  const [mapDataSUP, setMapDataSUP] = useState([]);
  const [nearest, setNearest] = useState([]);

  const url = `http://api.positionstack.com/v1/reverse?access_key=d190b912df2409194e8d4fad59e1637f&query=${latitude}%2C${longitude}`;

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setMapDataSUP(res.data);
        console.log(mapDataSUP);
      })
      .catch(error => {
        console.error('Error fetching SOS data:', error);
      });
  }, []);

  const url_get = `https://violet-kitten-toga.cyclic.cloud/v1/admin/get-nearest-user/${adminId}/${badgeId}`;
  useEffect(() => {
    axios.get(url_get)
      .then(res => {
        setNearest(res.data);
        console.log(res.data);
      })
      .catch(error => {
        console.error('Error fetching Session List:', error);
      });
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-header">
          <div className="sos-card-head-2">
            <h2 className="police-name">{policeName}</h2>
            <h6>POLICE ID - {badgeId}</h6>
          </div>
          <img src={profilePic} alt="Police Profile" className='img-surv2' />
        </div>

        <div className="ul">
          <div className="info-box">
            Location : <span>{mapDataSUP.data?.[0].label}</span>
          </div>
        </div>

        <div className="ul">
          <div className="info-box">
            Duty Start Time : <span>{startTime}</span>
          </div>

          <div className="info-box">
            Duty End Time : <span>{endTime}</span>
          </div>
        </div>

        <div className="ul">
          <div className="info-box">
            Check-in Time : <span>{checkIn}</span>
          </div>

          <div className="info-box">
            Nearest Police Officer : <span>{mapDataSUP.data?.[0].label ? (nearest.nearestUserID) - (nearest.nearestDistance) : <></>}</span>
          </div>
        </div>

        <button className="btn-sos" onClick=""           
        style={{
            backgroundColor:'#9a69c2' ,
            color: 'white',
            marginTop: '20px',
          }}>
          
            Get Nearest Police Officer 
            
        </button>
          {latitude && longitude ?
          <ShowMap latitude={latitude} longitude={longitude} /> : <></>}
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default SupervisionCard;

