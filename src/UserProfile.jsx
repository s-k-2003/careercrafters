import React from 'react';
import './UserProfile.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import logo from './logo.png'
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {

  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [userdescription, setUserdescription] = useState('');
  const [userskills, setUserskills] = useState('');
  const [info, setInfo] = useState([]);
  const [skilldata, setSkilldata] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();

  useEffect(()=>{
    if(!!username){
      const fetchData = async ()=>{
        try{
          const res = await axios.get(`http://localhost:8080/careercrafters/registerdata/${username}`)
          setInfo(res.data);
        }catch (error) {
          console.error('Error fetching skill data: ', error);
        }
      };
      fetchData();
    }
    
  },[username]);


  useEffect(()=>{
    if(!!username){
      const fetchSkill = async ()=>{
        try{
          const resdata = await axios.get(`http://localhost:8080/careercrafters/yourskills/${username}`);
          setSkilldata(resdata.data);
        }catch (error) {
          console.error('Error fetching skill data: ', error);
        }
      };
      fetchSkill();
    }
  },[username]);

  useEffect(()=>{
    if(!!username && info.length>0 && skilldata.length>0){
      const name = info[0].firstName + " "+ info[0].lastName;
      setFullname(name);

      const summary = skilldata[0].summary;
      setUserdescription(summary);

      const skill = skilldata[0].skills;
      setUserskills(skill)
      
    }
  })

  
  
  

  useEffect(()=>{
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
    setUsername(user);
  });


  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    nav('/');
  };

  if (!isLoggedIn) {
    nav('/login');
  }

  return (
    
    <div className='profilebody'>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" onClick={() => { nav('/'); }}></img>
        </div>
        <ul className="nav-links">
          <li><a>Contact us</a></li>
          <li><a href="home">Top Companies</a></li>
          <li><a href="" className="landinglogin-button" onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    <div className="card">
      <div className="infos">
        <div className="name">
          <h2>{fullname}</h2>
          <h4>@{username}</h4>
        </div>
        <p className="text">
          {userdescription}
        </p>
        <ul className="stats">
          <li>
            <h3>Skills</h3>
            <p className='text'>{userskills}</p>
          </li>
        </ul>
        <div className="links">
          
          <button className="view">Edit profile</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
