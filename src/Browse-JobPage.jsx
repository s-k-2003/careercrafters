import React, { useState } from 'react';
import './Browse-JobPage.css';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect } from 'react';
import axios from 'axios'
 
const CompaniesList = () => {
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('')

  const [companiesData, setCompaniesData] = useState([]);

  const getjobs=()=>{
    localStorage.setItem('cname',selectedCompany.companyname);
    if(isLoggedIn){
        nav('/roadmap')
    }else{
        nav('/login')
    }
  }

      const handleSearch = e => {
        const inputValue = e.target.value;
        setSearchQuery(inputValue);
      };

      useEffect(() => {
        const username = localStorage.getItem('user');
        setIsLoggedIn(!!username);
        setUsername(username);
    
        axios.get('http://localhost:8080/careercrafters/companieslist')
          .then(response => {
            setCompaniesData(response.data);
          })
          .catch(error => {
            console.error('Error fetching companies data:', error);
          });
      }, []);
    

      const filteredCompanies = companiesData.filter(company =>
        (company.companyname || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
      

  const openPopup = company => {
    setSelectedCompany(company);
  };
  

  const closePopup = () => {
    setSelectedCompany(null);
  };

  



  const handlelogout=()=>{
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    nav('/')
  }

  


  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt='logo' onClick={() => { nav('/'); }}></img>
        </div>
        {isLoggedIn ? (
            <ul className="nav-links">
            <li><a href="#">Career Advice</a></li>
            <li><a href="profile">Hello {username}</a></li>
            
            <li><a href="" className="landinglogin-button" onClick={handlelogout}>Logout</a></li>
          </ul>
        ):(
            <ul className="nav-links">
          <li><a href="#">Career Advice</a></li>
          <li><a href="/login">Welcome</a></li>
          
          <li><a href="/login" className="landinglogin-button">Login</a></li>
        </ul>
        )}
        
      </div>

      <div className="how-it-works">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <i className="searchInputIcon fa fa-search"></i>
          <h2>Top Companies</h2><br></br>
        </div>
        
        <div className="company-container">
          {filteredCompanies.map(company => (
            <div
              key={company.companyname}
              className="company-box"
              onClick={()=>openPopup(company)}
            >
              <h3>{company.companyname}</h3>
              <div className="company-description">{company.description}</div>
            </div>
          ))}
        </div>
        {selectedCompany && (
          <div className="popup">
            <h3>{selectedCompany.companyname}</h3>
            <p>{selectedCompany.description}</p>
            <p>Ratings: {selectedCompany.ratings}</p>
            <p>Origin: {selectedCompany.country_orgin}</p>
            <button onClick={closePopup}>Close</button>
            <button onClick={getjobs}>Check Jobs</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CompaniesList;
