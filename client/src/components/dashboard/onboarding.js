import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import id from '../../assets/logos/id.png';
import avatar from '../../assets/logos/shg.svg';
import ranker from '../../assets/logos/rank.png';
import photo from '../../assets/logos/photo1.png';
import emaillogo from "../../assets/logos/emailogo.png";
import phonelogo from "../../assets/logos/phonelogo.png";
import Swal from 'sweetalert2';



import NavbarInside from './navbar-inside2';
import AdminIdContext from "../context/adminContext";
import '../../assets/css/home.css';

const Onboarding = () => {
  const { adminId } = useContext(AdminIdContext);
  const [badgeID, setBadgeID] = useState(); 
  const [firstName, setFirstName] = useState(''); 
  const [surname, setSurname] = useState(''); 
  const [rank, setRank] = useState(''); 
  const [profilePic, setProfilePic] = useState(''); 
  const [phoneNo, setPhoneNo] = useState(); 
  const [email, setEmail] = useState(''); 
  const [gender, setGender] = useState('Male');
  const [policeStationId, setPoliceStationId] = useState(); 
  const [policeStationIdList, setPoliceStationIdList] = useState([]);



  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        console.log(reader.result);
        setProfilePic(reader.result);
    };
    reader.onerror = error =>{
        console.log("Error: ",error);
    };
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  const url_get_psids = `https://violet-kitten-toga.cyclic.cloud/v1/admin/police-stations/${adminId}`;

  useEffect(() => {
    
    axios.get(url_get_psids)
      .then(result => {
        setPoliceStationIdList(result.data);
        console.log('Users Fetched');
        console.log(result.data);
      })
      .catch(error => {
        console.error('Error fetching Session List:', error);
      });
  }, []);


  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      badgeID: parseInt(badgeID),
      firstName: firstName,
      surname: surname,
      rank: rank,
      policeStationId:parseInt(policeStationId.match(/(\d+)/)[0]),
      profilePic: profilePic,
      phoneNo: phoneNo,
      emailId: email,
      gender: gender,
      totalSessions: 15,
      totalAttended: 5,
      totalHoursOnDuty: 20,
      loadFactor:1,
    };
    console.log(data)
    const url = `https://violet-kitten-toga.cyclic.cloud/v1/admin/add-user/${adminId}`;
    axios.post(url, data, config)
      .then((response) => {
        console.log('Data sent successfully:', response.data);
        Swal.fire({
          icon: (response.data.error) ? 'error' : 'success',
          title: (response.data.error) ? response.data.error : response.data.message,
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
      <div className='wrapper wrapper22 wrapper76' style={{ marginTop: '200px' }}>
        <h1 className='heading-settings'>Police Officer Onboarding</h1>
          <div className='settings-box'>
            <form className='form-notifs'>
              <div className='row'>
              <div className='col-sm-6'>
                  <label htmlFor='badgeID'>
                    Police ID :{' '}
                  </label>
                  <span>
                    <img alt='' className='updater' src={id}></img>
                  </span>
                  <input
                    type='number'
                    name='badgeID'
                    placeholder= 'Enter Police ID'
                    value={badgeID} required autoComplete='off'
                    onChange={(e) => setBadgeID(e.target.value)}
                  />
                </div>                
                <div className='col-sm-6'>
                  <label htmlFor='rank'> Rank : </label>
                  <span>
                  <img alt='' className='updater' src={ranker}></img>
                  </span>
                  <input
                    type='string'
                    name='rank'
                    placeholder= 'Enter Rank of Officer'
                    value={rank} required autoComplete='off'
                    onChange={(e) => setRank(e.target.value)}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-6'>
                  <label htmlFor='firstName'> First Name : </label>
                  <span>
                    <img alt='' className='updater' src={avatar}></img>
                  </span>
                  <input
                    type='string'
                    name='firstName'
                    placeholder='Enter First Name'
                    value={firstName} required autoComplete='off'
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className='col-sm-6'>
                  <label htmlFor='surname'> Last Name : </label>
                  <span>
                    <img alt='' className='updater' src={avatar}></img>
                  </span>
                  <input
                    type='string'
                    name='endTime'
                    placeholder='Enter Last Name'
                    value={surname} required autoComplete='off'
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
              </div>
              <div className='row'>


                <div className='col-sm-6'>
                  <label htmlFor='phoneNo'> Phone No : </label>
                  <span>
                    <img alt='' className='updater' src={phonelogo}></img>
                  </span>
                  <input
                    type='string'
                    name='PhoneNo'
                    placeholder='Enter Phone No' minLength={10} maxLength={10}
                    value={phoneNo} required autoComplete='off'
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
                <div className='col-sm-6'>
                  <label htmlFor='email'> Email : </label>
                  <span>
                    <img alt='' className='updater' src={emaillogo}></img>
                  </span>
                  <input
                    type='email'
                    name='email'
                    placeholder='Enter email'
                    value={email} required autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>       
              <div className='row'>
                <div className='col-sm-3'>
                  <label htmlFor='photo'> Officer Photograph : </label>
                  <span>
                    <img alt='' className='updater' src={photo}></img>
                  </span>
                  <input
                    accept='image/*'
                    type='file'
                    name='profile-pic' required autoComplete='off'
                    onChange={convertToBase64} style={{display:'none',}} id='imger'
                  />
                  
                  <label for="imger" className='label-imger'>Upload Passport Image</label>
                  <div className='img-preview'>
                  {profilePic=="" || profilePic==null?"":<img className='profiler' alt='' src={profilePic} />}
                  </div>
                </div>
                <div className='col-sm-3'>
                  <label htmlFor='location'> Gender : </label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option onClick={() => setGender('Meeting')}> Male </option>
                        <option onClick={() => setGender('Duty')}> Female </option>
                        <option onClick={() => setGender('Local Events')}> Others </option>
                    </select>
                  </div>
                <div className='col-sm-6'>
                  <label htmlFor='psID'> Police Station Unique ID : </label>
                  <span>
                    <img alt='' className='updater' src={id}></img>
                  </span>
                  <select value={policeStationId} onChange={(e) => setPoliceStationId(e.target.value)}>
                    <option>Select Police Station</option>
                  { Array.isArray(policeStationIdList) && policeStationIdList.length > 0 ? 
                    (policeStationIdList.map((policeStationIdList) => (
                        <option onClick={() => setPoliceStationId(policeStationIdList.policeStationId)}>{policeStationIdList.policeStationId} - {policeStationIdList.thanaName} {policeStationIdList.state}</option>
                    ))) : <></> }
                  </select>

                </div>
              </div>
              <br></br>
              <div className='row'>
                <center>
                <input
                  type='submit'
                  value='Onboard'
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

export default Onboarding;