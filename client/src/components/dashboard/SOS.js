import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "../../assets/css/sos.css";
import NavbarInside from './navbar-inside2';
import SOSCard from "./SOS-card";
import AdminIdContext from "../context/adminContext";

const SOS = () => {
  var count=0;
  const { adminId } = useContext(AdminIdContext);
  const [sosData, setSOSData] = useState([]);
  const url = `https://violet-kitten-toga.cyclic.cloud/v1/admin/sos/${adminId}`;
  
  useEffect(() => {
    axios.get(url)
      .then(res => {
        setSOSData(res.data);
        console.log(res.data)
      })
      .catch(error => {
        console.error('Error fetching SOS data:', error);
      });
  }, []);

  return (
    <div className='home-outer-sos'>
      <div>
        <NavbarInside />
      </div>
      <center><h1 className="sos-heading">SOS Received</h1></center>
      <div className="cards">
        { (Array.isArray(sosData) && sosData.length > 0) ?
        (sosData.map((sosItem, index) => (
          (sosItem.issue.resolved == true ? (<div style={{display:'none'}}>{count=count+1}</div>) : (
          <SOSCard
            key={index}
            name={sosItem.firstName}
            issueID={sosItem.issueID}
            badgeID={sosItem.issue.issue.badgeID} 
            time={new Date(sosItem.issue.issue.raised).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            location={sosItem.issue.issue.location} 
            latitude={sosItem.issue.issue.latitude}
            longitude={sosItem.issue.issue.longitude}
            description={sosItem.issue.issue.issueText} 
            profilePic={sosItem.profilePic}
            respond={sosItem.issue.issue.resolved} 
          />))
        )))
      : <><p className='prompter-prompt'>No SOS data available. All SOS's are resolved.</p></>
      }
        { count? <></> :<></>}
      </div>
    </div>
  )
}

export default SOS;
