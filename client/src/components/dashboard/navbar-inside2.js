import '../../assets/css/navbar.css';
import AdminIdContext from "../context/adminContext";
import AdminNameContext from '../context/AdminNameContext';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/modal.css';
import userAvatar from '../../assets/logos/user-avatar.png';

const NavbarInside = () => {

  const { adminId } = useContext(AdminIdContext);
  const { firstName } = useContext(AdminNameContext);

  return (
    <>
      <nav className='nav nav-inside'>
        <div className='nav-header'>
          <div className='nav-title-inner2'>
            <div className='row'>
              <div className='col-sm-2'>
                <img src={userAvatar} className='navbar-inside-logo'></img>
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
          <Link to='/dashboard/home'>
              
          <i class="fa-solid fa-2x fa-circle-chevron-left"></i>
          </Link>
        </div>
      </nav>

      
    </>
  );
};

export default NavbarInside;
