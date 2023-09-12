import React, {useEffect, useState } from 'react';
import './Road-map.css';
import logo from './logo.png';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SkillGapAnalysis = () => {

  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [companyname, setCompanyname] = useState('');
const [username, setUsername] = useState('');
const [jobs, setJobs] = useState([]); 
const [selectedJobs, setSelectedJobs] = useState(null);

useEffect(()=>{
  const username = localStorage.getItem('user');
  setIsLoggedIn(!!username);
  setUsername(username);




  const companyname = localStorage.getItem('cname');
  setCompanyname(companyname);
  // console.log(companyname);

  axios.get(`http://localhost:8080/careercrafters/joblist/${companyname}`).then(response=>{
    setJobs(response.data);
  }).catch(error=>{
    console.error('Error in fetching:',error);
  });


 
},[]);
      const [searchTerm, setSearchTerm] = useState('');
    
      const handleSearchChange = (e) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
      };
    
      const filteredJobs = jobs.filter(job => {
        return(
          (
            (job.designation || ' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (job.skills || ' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (job.experince || ' ').toLowerCase().includes(searchTerm.toLowerCase())
          )

        );
      });

      const handlelogout=()=>{
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        nav('/')
      }
      
      if (!isLoggedIn) {
        nav("/login");
      }

      const handleMaps=()=>{
        
      }

      const openPopup = job => {
        setSelectedJobs(job);
        if(selectedJobs!=null){
          localStorage.setItem('skills',selectedJobs.skills);
          localStorage.setItem('designation',selectedJobs.designation);
          nav('/map')
          // localStorage.removeItem('skills');
          // sessionStorage.removeItem('skills')

        }
      };
    
    
      return (
        <>
        <div className="navbar">
        <div className="logo">
          <img src={logo} alt='logo' onClick={() => { nav('/'); }}></img>
        </div>
        
            <ul className="nav-links">
            <li><a href="home">Top Companies</a></li>
            <li><a href="profile">Hello {username}</a></li>
            
            <li><a href="" className="landinglogin-button" onClick={handlelogout}>Logout</a></li>
          </ul>
        
        
      </div>
        <div className="job-listing-container">
          {/* <h2>Avaliable Jobs in {companyname}</h2> */}
          <div>
            <input
              type="text"
              placeholder="Search by job title, skills, or experience..."
              value={searchTerm}
              onChange={handleSearchChange}
              />
          </div>
          <ul>
            {filteredJobs.map((job, index) => (
              <li key={index} onClick={()=>openPopup(job)}>
              <h3><strong>{job.designation}</strong></h3><br />
              <p>{companyname}</p>
              <strong>⏳ </strong>{job.experince}<br />

              <strong>Skills Required: </strong>{job.skills}
            </li>
            ))}
          </ul>

        </div>
        </>
      );
};

export default SkillGapAnalysis;
