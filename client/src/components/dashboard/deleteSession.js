import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import avatar from '../../assets/logos/shg.svg';
import NavbarInside from './navbar-inside2';
import '../../assets/css/home.css';
import AdminIdContext from "../context/adminContext";
import Swal from 'sweetalert2';

const DeleteSession = () => {
  const { adminId } = useContext(AdminIdContext);
  const [sessionID, setSessionID] = useState('');
  const [sessionList, setSessionList] = useState([[]]);
  
  const url_get = `https://violet-kitten-toga.cyclic.cloud/v1/admin/${adminId}/sessions`;

  useEffect(() => {
    
    axios.get(url_get)
      .then(result => {
        setSessionList(result.data.sessions);
        console.log('Sessions Fetched');
      })
      .catch(error => {
        console.error('Error fetching Session List:', error);
      });
  }, []);

  
  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
        sessionId: parseInt(sessionID.match(/(\d+)/)[0]),
    };
    const url_post = `https://violet-kitten-toga.cyclic.cloud/v1/admin/delete-session/${adminId}/${sessionID.match(/(\d+)/)[0]}`;
    
    axios.delete(url_post, data)
      .then((response) => {
        console.log('Data sent successfully:', response.data);
        Swal.fire({
          icon: (response.data.error) ? 'error' : 'success',
          title: (response.data.error) ? response.data.error : 'Session Successfully Deleted',
          showConfirmButton: false,
          timer:1500,
        }
        )
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <div className='home-outer'>
      <div>
        <NavbarInside />
      </div>
      <div className='wrapper wrapper22 wrapper76 wrapper77' style={{ marginTop: '200px' }}>
        <h1 className='heading-settings'>Delete Session</h1>
          <div className='settings-box'>
            <form className='form-notifs'> 
              <div className='row'>
                <div className='col-sm-2'>
                </div>
                <div className='col-sm-8'>
                  <label htmlFor='police-officer'>
                    Sessions :{' '}
                  </label>
                  <select value={sessionID} onChange={(e) => setSessionID(e.target.value)}>
                    <option>Select Session</option>
                    {Array.isArray(sessionList) && sessionList.length > 0 ? (
                    sessionList.map((sessionList) => (
                        <option onClick={() => setSessionID(sessionList.sessionID)}>{sessionList.sessionID} - {sessionList.sessionLocation} </option>
                    ))) : <></> }
                  </select>
                </div> 
                <div className='col-sm-2'>
                </div>
              </div>
              <div className="row">
              <center>
                <input
                  type="submit"
                  value="Delete Session"
                  className="btn-sbmt col-sm-6"
                  style={{marginTop: '20px'}}
                  onClick={onSubmit}
                />{" "}
              </center>
              </div>
             
              <ul class='bg-bubbles'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </form>
          </div>
      </div>
    </div>
  );
};

export default DeleteSession;