import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/modal.css';
import '../../assets/css/form.css';
import Loader from '../../assets/images/Loader123.gif';
import Swal from 'sweetalert2';
import AdminEmailContext from '../context/adminContext';
import AdminNameContext from '../context/AdminNameContext';
import axios from 'axios';

const SignUp = () => {

  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [firstname, setfirstName] = useState('');
  const [surname, setsurName] = useState('');
  const [pnumber,setpNumber] = useState('');
  const [gender,setGender]=useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useNavigate(); 
  const {setAdminEmail}=useContext(AdminEmailContext);
  const {setAdminName}=useContext(AdminNameContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
  },
};

const onSubmit = (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);
 
     const data = {
       emailId: emailId,
       password: password,
       password0: cpassword,
       firstName:firstname ,
       surname: surname,
       phoneNo: pnumber,
       gender:gender,
       };
 
       console.log(data)
     const url = `http://localhost:8000/v1/user/signUp`;
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
        setIsLoading(false);

        setAdminEmail(data.emailId);
        setAdminName(data.name);
        console.log(data.message);
        localStorage.setItem('AdminEmail',data.AdminEmail);
        localStorage.setItem('firstName',data.name);

        {(response.data.error) ? <></> : history('dashboard/home')}
       })
       .catch((error) => {
         console.error('Error sending data:', error);
         setIsLoading(false);
       });
   };
  
  return (
    <>
      <div id="signup" className="modal-window">
        <div>
          <a href="#" title="Close" className="modal-close">
            X
          </a>
          <h1>SIGN UP</h1>
          <form>
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
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password" 
                name="cpassword"
                autoComplete="off"
                required
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                name="fname"
                autoComplete="off"
                required
                value={firstname}
                onChange={(e) => setfirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sname">Surname</label>
              <input
                type="text"
                name="sname"
                autoComplete="off"
                required
                value={surname}
                onChange={(e) => setsurName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pnumber">Phone Number</label>
              <input
                type="tel"
                name="pnumber"
                autoComplete="off"
                required
                value={pnumber}
                onChange={(e) => setpNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                name="gender"
                autoComplete="off"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="btn-sbmt-cont">
              <button type="submit" value="SignUp" className="btn-sbmt" disabled={isLoading} onClick={onSubmit}>
                {isLoading ? (
                  <>
                    <img src={Loader} className="loginbtn-loader" alt="Loader" /> Signing In....
                  </>
                ) : (
                  'Sign Up'
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

export default SignUp;
