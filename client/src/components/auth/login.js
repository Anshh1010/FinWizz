import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/modal.css';
import '../../assets/css/form.css';
import axios from 'axios';
import Loader from '../../assets/images/Loader123.gif';
import AdminIdContext from '../context/adminContext';
import AdminNameContext from '../context/AdminNameContext.js';
import Swal from 'sweetalert2';

const Login = () => {
  const { setAdminId } = useContext(AdminIdContext);
  const { adminId } = useContext(AdminIdContext);
  const { setAdminName } = useContext(AdminNameContext);
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

    
  const GetOTP = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const apiUrl = 'https://violet-kitten-toga.cyclic.cloud/v1/admin/login';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId, password }),
      });

      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Login failed. Please check your credentials.');
        return;
      }

      const data = await response.json();

      setAdminId(data.adminID);
      setAdminName(data.firstName);
      localStorage.setItem('adminID', data.adminID);
      localStorage.setItem('firstName', data.firstName);
    } catch (error) {
      setError('An error occurred during login. Please try again later.');
      setIsLoading(false);
    }
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const handleFormSubmit =(e)=> {
    e.preventDefault();

    const data = {
      adminId:adminId,
      otp:otp.toString(),
    };
    console.log(data)
    const url_post = `https://violet-kitten-toga.cyclic.cloud/v1/admin/verify-otp`;

    axios.post(url_post, data, config)
    .then((response) => {
      console.log('Data sent successfully:', response.data);
      Swal.fire({
        icon: (response.data.error) ? 'error' : 'success',
        title: (response.data.error) ? 'Incorrect OTP' : response.data.message,
        showConfirmButton: false,
        timer:1500,
      }
      )
      {(response.data.error) ? <></> : history('dashboard/home')}
    } 
    )
    .catch((error) => {
      console.error('Error sending data:', error);
    });
    
  };


  return (
    <>
      <div id="login" className="modal-window">
        <div>
          <a href="#" title="Close" className="modal-close">
            X
          </a>
          <h1>LOGIN</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                required
                value={emailId}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password" 
                name="password"
                autoComplete="off"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <input
                type="password" 
                name="OTP"
                value={otp} minLength={6} maxLength={6} autoComplete="off"
                onChange={handleOTPChange}
              />
            </div>
            <Link to="" onClick={GetOTP}>GET OTP</Link>
            <div className="btn-sbmt-cont">
              <button type="submit" value="Login" className="btn-sbmt" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <img src={Loader} className="loginbtn-loader" alt="Loader" /> Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
          <p>
            {error && <div className="error-message">{error}</div>}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
