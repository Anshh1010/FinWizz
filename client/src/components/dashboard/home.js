import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/home.css';
import AdminEmailContext from "../context/adminContext";
import NavbarMain from '../homepage/navbar-main';
import Login from '../auth/login.js';
import SignUp from '../auth/signUp.js';
import AddUser from '../auth/addUser';
import image1 from '../../assets/logos/logo1.png';
import '../../assets/css/navbar.css';

const Home = () => {
  const URL = 'http://localhost:3000/dashboard/home';
  

  
  
  
  return (
    <>
      <div className='dash'>
          <a href={`${URL}/#home`} className='jhk'>
            STOCKS
          </a>
          <a href={`${URL}/#about`}>ETF</a>
          <a href={`${URL}/#contact`}>MUTUAL FUNDS</a>
          <a href={`${URL}/#adduser`} className='signupbtn'>
            Add User
          </a>
          <AddUser />
      </div>
      
    </>
  );
};

export default Home;

