import React from 'react';
import './LandingPage.css'; 
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'
import { useEffect, useState } from 'react';

function LandingPage() {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('')

    useEffect(() => {
        const username = localStorage.getItem('user');
        setIsLoggedIn(!!username);
        setUsername(username);
      }, []);

      const handlelogout=()=>{
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        navigate('/')
      }


  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt='logo'></img>
        </div>
        {isLoggedIn ? (
             <ul className="nav-links">
             <li className="dropdown">
               <a>How It Works</a>
               <div className="dropdown-content">
                 <a href="#">For Students</a>
                 <a href="#">Admin Login</a>
               </div>
             </li>
             <li><a href="#">About Us</a></li>
             <li><a href="" className="landinglogin-button" onClick={handlelogout}>Logout</a></li>
           </ul>
        ):(
            <ul className="nav-links">
            <li className="dropdown">
              <a>How It Works</a>
              <div className="dropdown-content">
                <a href="#">For Students</a>
                <a href="#">Admin Login</a>
              </div>
            </li>
            <li><a href="#">About Us</a></li>
            <li><a href="login" className="landinglogin-button">Login</a></li>
          </ul>
        )}
       
      </div>

      <div className="main-content"></div>

      <div className="get-started-button-bottom" onClick={()=>navigate('/home')}>Get Started</div>

    </div>
  );
}

export default LandingPage;
