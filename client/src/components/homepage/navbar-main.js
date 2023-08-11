import '../../assets/css/navbar.css';
import Login from '../auth/login.js';
import SignUp from '../auth/signUp.js';
import image1 from '../../assets/logos/logo1.png';
import AddUser from '../auth/addUser';

const NavbarMain = () => {
  let URL = 'http://localhost:3000';
  return (
    <>
      <nav className='nav'>
        <div className='nav-header'>
          <div className='nav-title'>
            <span className='nav-title-inner'>
            <img src={image1} />
            {/* FinWizz */}
            </span>
          </div>
        </div>
        <div className='nav-btn'>
          <label htmlFor='nav-check'>
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <input type='checkbox' id='nav-check'></input>
        <div className='nav-links'>
          <a href={`${URL}/#home`} className='jhk'>
            HOME
          </a>
          <a href={`${URL}/#about`}>ABOUT</a>
          <a href={`${URL}/#contact`}>CONTACT</a>
          <a href={`${URL}/#signup`} className='signupbtn'>
            SIGN UP
          </a>
          <SignUp />
          <a href={`${URL}/#login`} className='loginbtn'>
            LOGIN
          </a>
          <Login />
          {/* <a href={`${URL}/#adduser`} className='loginbtn'>
            ADD USER
          </a>
          <AddUser /> */}
        </div>
      </nav>
    </>
  );
};

export default NavbarMain;
