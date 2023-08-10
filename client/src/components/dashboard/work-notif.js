import React, { useState, useContext } from 'react';
import axios from 'axios';
import avatar from '../../assets/logos/shg.svg';
import avatarid from '../../assets/logos/id.png';
import timer from '../../assets/logos/time.png';
import NavbarInside from './navbar-inside2';
import '../../assets/css/home.css';
import AdminIdContext from "../context/adminContext";

const WorkNotifs = () => {
  const { adminId } = useContext(AdminIdContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [choiceValue, setChoiceValue] = useState('Meeting');
  const [postValue, setPostValue] = useState('Police Officer');
  const [uniqueId, setUniqueId] = useState();
  
  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      badgeID: parseInt(uniqueId),
      title: title,
      message: description,
      type: choiceValue,
    };
    console.log(data)
    const url = `https://violet-kitten-toga.cyclic.cloud/v1/admin/notif/${adminId}`;
    
    axios.post(url, data)
      .then((response) => {
        console.log('Data sent successfully:', response.data);
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
      <div className='wrapper wrapper22 wrapper76' style={{ marginTop: '200px' }}>
        <h1 className='heading-settings'>Post Work Notifications</h1>
          <div className='settings-box'>
            <form className='form-notifs'> 
              <div className='row'>
              <div className='col-sm-6'>
                  <label htmlFor='title'>
                    Notification Title :{' '}
                  </label>
                  <span>
                    <img alt='' className='updater updater-notif' src={avatar}></img>
                  </span>
                  <input
                    type='string'
                    name='title'
                    placeholder= 'Enter Title for Notification'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>                
                <div className='col-sm-6'>
                  <label htmlFor='location'>Type : </label>
                    <select value={choiceValue} onChange={(e) => setChoiceValue(e.target.value)}>
                        <option onClick={() => setChoiceValue('Meeting')}> Meeting </option>
                        <option onClick={() => setChoiceValue('Duty')}> Duty </option>
                        <option onClick={() => setChoiceValue('Local Events')}> Local Events </option>
                        <option onClick={() => setChoiceValue('Emergency')}> Emergency </option>
                        <option onClick={() => setChoiceValue('Others')}> Others </option>
                    </select>
                </div>
              </div>

              <div className='row'>
              <div className='col-sm-6'>
                  <label htmlFor='location'>Post To : </label>
                    <select value={postValue} onChange={(e) => setPostValue(e.target.value)}>
                        <option onClick={() => setPostValue('Police Officer')}> Police Officer </option>
                        <option onClick={() => setPostValue('Police Station')}> Police Station </option>
                    </select>
                </div>
                <div className='col-sm-6'>
                    <label htmlFor='title'>
                      Unique ID :{' '}
                    </label>
                    <span>
                      <img alt='' className='updater updater-notif' src={avatarid}></img>
                    </span>
                    <input
                      type='number'
                      name='uniqueid'
                      placeholder= 'Enter Unique ID'
                      value={uniqueId}
                      onChange={(e) => setUniqueId(e.target.value)}
                    />
                  </div>                
              </div>
              <div className='row'>
                <div className='col-sm-12'>
                <label htmlFor='time'> Description : </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
              </div>
        
              <br></br>
              <div className='row'>
                <center>
                <input
                  type='submit'
                  value='Post'
                  className='btn-sbmt col-sm-6'
                  onClick={onSubmit}
                /> </center>
               
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

export default WorkNotifs;