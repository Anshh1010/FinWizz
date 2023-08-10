import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import avatar from '../../assets/logos/shg.svg';
import NavbarInside from './navbar-inside2';
import '../../assets/css/home.css';
import AdminIdContext from "../context/adminContext";
import Swal from 'sweetalert2';

const DeleteUser = () => {
  const { adminId } = useContext(AdminIdContext);
  const [badgeID, setBadgeID] = useState('');
  const [badgeIDList, setBadgeIDList] = useState([]);
  
  const url_get_badgeids = `https://violet-kitten-toga.cyclic.cloud/v1/admin/get-users/${adminId}`;

  useEffect(() => {
    
    axios.get(url_get_badgeids)
      .then(result => {
        setBadgeIDList(result.data.users);
        console.log('Users Fetched');
      })
      .catch(error => {
        console.error('Error fetching Session List:', error);
      });
  }, []);

  
  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      badgeID: parseInt(badgeID.match(/(\d+)/)[0]),
    };
    const url_post = `https://violet-kitten-toga.cyclic.cloud/v1/admin/delete-user/${adminId}/${badgeID.match(/(\d+)/)[0]}`;
    
    axios.delete(url_post, data)
      .then((response) => {
        console.log('Data sent successfully:', response.data);
        Swal.fire({
          icon: (response.data.error) ? 'error' : 'success',
          title: (response.data.error) ? response.data.error : 'User Successfully Deleted',
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
        <h1 className='heading-settings'>Delete Users</h1>
          <div className='settings-box'>
            <form className='form-notifs'> 
              <div className='row'>
                <div className='col-sm-2'>
                </div>
                <div className='col-sm-8'>
                  <label htmlFor='police-officer'>
                    Police Officer :{' '}
                  </label>
                  <select value={badgeID} onChange={(e) => setBadgeID(e.target.value)}>
                    <option>Select Police Officer</option>
                    { Array.isArray(badgeIDList) && badgeIDList.length > 0 ? (
                    badgeIDList.map((badgeIDList) => (
                        <option onClick={() => setBadgeID(badgeIDList.badgeID)}>{badgeIDList.badgeID} - {badgeIDList.firstName} {badgeIDList.surname}</option>
                    ))) : <></>}
                  </select>
                </div> 
                <div className='col-sm-2'>
                </div>
              </div>
              <div className="row">
              <center>
                <input
                  type="submit"
                  value="Delete User"
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

export default DeleteUser;