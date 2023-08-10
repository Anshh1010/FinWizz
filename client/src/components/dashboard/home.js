import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/home.css';
import NavbarInside from './navbar-inside.js'; 
import photo3 from '../../assets/dashboard-logos/workforce.png'; 
import photo2 from '../../assets/dashboard-logos/track.png'; 
import photo1 from '../../assets/dashboard-logos/planner.png';
import photo4 from '../../assets/dashboard-logos/supervised.png'; 
import photo5 from '../../assets/dashboard-logos/phone.png'; 
import photo6 from '../../assets/dashboard-logos/sos.png'; 
import photo7 from '../../assets/dashboard-logos/delete-event.png'; 
import photo8 from '../../assets/dashboard-logos/delete-user.png'; 
import photo9 from '../../assets/dashboard-logos/analytics.png'; 
import AdminIdContext from "../context/adminContext";
import { Link } from 'react-router-dom';

const Home = () => {
  const { adminId } = useContext(AdminIdContext);
  const [duties, setDuties] = useState(0);
  const [sessions, setSessions] = useState(0);
  const [issues, setIssues] = useState(0);

  const url_get = `https://violet-kitten-toga.cyclic.cloud/v1/admin/statistics/${adminId}`;
  
  useEffect(() => {
    axios
      .get(url_get)
      .then((response) => {
        console.log("Received data:", response.data);
        setDuties(response.data.dutiesNow);
        setSessions(response.data.ongoingSessions);
        setIssues(response.data.issueRaisedToday);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
  
  return (
    <>
      <div className='home-outer home-overflow'>
        <div>
          <NavbarInside />
        </div>
        <div className='main'>

          <div className='main-in'>
            <div className='home-box-outer' style={{marginTop:'170px'}}>
            <div className="analytics-base-data row">
            <p className="p1 col-sm-3">Number of officers on duty: {duties}</p>
            <p className="p2 col-sm-3">Number of active sessions: {sessions}</p>
            <p className="p1 col-sm-3">
              New issues in past 24 hrs: {issues.length}
            </p>
          </div>
              <div className='row' style={{marginTop:'40px'}}>
              <div className='home-box col-sm-4'>
                  <center>
                    <Link to='/dashboard/onboarding'>
                    <div className='row'>
                      <div className='box-inner-left col-sm-4'>
                        <img alt='' src={photo1} className='box-inner-img'></img>
                      </div>
                      <div className='box-inner-right bxr6 col-sm-8'>
                      Police Officer Onboarding
                      </div>  
                    </div>
                    </Link>
                  </center>
                </div>


                <div className='home-box col-sm-4'>
                <center>
                  <Link to='/dashboard/create-session'>
                  <div className='row'>
                    <div className='box-inner-left col-sm-4'>
                      <img alt='' src={photo2} className='box-inner-img'></img>
                    </div>
                    <div className='box-inner-right bxr6 col-sm-8'>
                    Create Session
                    </div>  
                  </div>
                  </Link>
                </center>
              </div>

              <div className='home-box col-sm-4'>
                  <center>
                    <Link to='/dashboard/assign-duty'>
                    <div className='row'>
                      <div className='box-inner-left col-sm-4'>
                        <img src={photo3} className='box-inner-img' alt=''></img>
                      </div>
                      <div className='box-inner-right bxr6 col-sm-8'>
                      Assign Duty
                      </div>  
                    </div>
                    </Link>
                  </center>
                </div>
            </div>
            </div>

            <div className='home-box-outer'>
            <div className='row'>

            <div className='home-box col-sm-4'>
                  <center>
                    <Link to='/dashboard/supervision'>
                    <div className='row'>
                      <div className='box-inner-left col-sm-4'>
                        <img alt='' src={photo4} className='box-inner-img'></img>
                      </div>
                      <div className='box-inner-right bxr6 col-sm-8'>
                       Police Officer Supervision
                      </div>  
                    </div>
                    </Link>
                  </center>
                </div>

            <div className='home-box col-sm-4'>
                  <center>
                    <Link to='/dashboard/post-work-notifications'>
                    <div className='row'>
                      <div className='box-inner-left col-sm-4'>
                        <img alt='' src={photo5} className='box-inner-img'></img>
                      </div>
                      <div className='box-inner-right bxr6 col-sm-8'>
                      Post Work Notifications
                      </div>  
                    </div>
                    </Link>
                  </center>
                </div>


            <div className='home-box col-sm-4'>
                <center>
                <Link to='/dashboard/sos'>
                <div className='row'>
                    <div className='box-inner-left col-sm-4'>
                      <img alt='' src={photo6} className='box-inner-img'></img>
                    </div>
                    <div className='box-inner-right bxr6 col-sm-8'>
                     SOS
                    </div>  
                  </div>
                  </Link>
                </center>
              </div>
            </div>
            </div>

            <div className='home-box-outer' style={{paddingBottom:'50px'}}>
            <div className='row'>

            <div className='home-box col-sm-4'>
                  <center>
                    <Link to='/dashboard/delete-sessions'>
                    <div className='row'>
                      <div className='box-inner-left col-sm-4'>
                        <img alt='' src={photo7} className='box-inner-img'></img>
                      </div>
                      <div className='box-inner-right bxr6 col-sm-8'>
                       Delete Session
                      </div>  
                    </div>
                    </Link>
                  </center>
                </div>

            {/* <div className='home-box col-sm-4'>
                  <center>
                    <Link to='/dashboard/delete-users'>
                    <div className='row'>
                      <div className='box-inner-left col-sm-4'>
                        <img alt='' src={photo8} className='box-inner-img'></img>
                      </div>
                      <div className='box-inner-right bxr6 col-sm-8'>
                      Delete User
                      </div>  
                    </div>
                    </Link>
                  </center>
                </div> */}


            <div className='home-box col-sm-4'>
                <center>
                <Link to='/dashboard/analytics'>
                <div className='row'>
                    <div className='box-inner-left col-sm-4'>
                      <img src={photo9} className='box-inner-img' alt=''></img>
                    </div>
                    <div className='box-inner-right bxr6 col-sm-8'>
                    Real Time Analytics
                    </div>  
                  </div>
                  </Link>
                </center>
              </div>

            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

