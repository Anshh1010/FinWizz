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
import {Link} from 'react-router-dom';

const Home = () => {
  const URL = 'http://localhost:3000/dashboard';
  

  
  
  
  return (
    <>
      <div className='dash'>
          
          <Link to="/dashboard/risk">Risk</Link>
          <Link to="/dashboard/stocks">Stocks</Link>
          <a href={`${URL}/home/#adduser`}>
            Add User
          </a>
          <AddUser />
          <Link to="/" className='signupbtn'>Logout</Link>
      </div>
      
    </>
  );
};

export default Home;

