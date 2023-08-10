import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/navbar.css';
import AdminIdContext from "../context/adminContext";
import AdminNameContext from '../context/AdminNameContext';
import userAvatar from '../../assets/logos/user-avatar.png';

const NavbarInside = () => {
  const { setAdminId } = useContext(AdminIdContext);
  const { firstName } = useContext(AdminNameContext);
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminID');
    setAdminId(null);
    history('/');
  };

  return (
    <>
      <nav className='nav nav-inside'>
        <div className='nav-header'>
          <div className='nav-title-inner2'>
            <div className='row'>
              <div className='col-sm-2'>
                <img src={userAvatar} className='navbar-inside-logo' alt="User Avatar" />
              </div>
              <div className='col-sm-10'>
                <span className=''>
                  <span className='welcomerr'>WELCOME</span>
                  <p>
                    {firstName}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='nav-btn-22 navbar-back-arrow'>
          {/* <i className="fa-solid fa-2x fa-circle-chevron-left" onClick={handleLogout}></i> */}
        </div>
        <div className='nav-analytics-link' style={{ position: 'absolute', right: '0', top: '20' }}>
          <Link to="/dashboard/analytics">
          </Link>
        </div>
        <div onClick={handleLogout}  style={{ position: 'absolute', right: '130px', top: '35px', width:'40', padding:'15px 8px' }} className='logoutbtn'>
            LOGOUT
          </div>
      </nav>
    </>
  );
};

export default NavbarInside;
