import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import logo from './logo.png';
import './Maps.css';

const Maps = () => {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const skillsset = localStorage.getItem('skills');
  const designation = localStorage.getItem('designation');
  const [skillData, setSkillData] = useState([]);
  const [gapskills, setGapSkills] = useState([]);
  const [knownSkills, setKnownSkills] = useState([]);


  useEffect(() => {
    const username = localStorage.getItem('user');
    setIsLoggedIn(!!username);
    setUsername(username);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/careercrafters/SkillMap');
        setSkillData(response.data);
      } catch (error) {
        console.error('Error fetching companies data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(!!username){
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/careercrafters/yourskills/${username}`);
          setKnownSkills(res.data);
        } catch (error) {
          console.error('Error fetching skill data: ', error);
        }
      };
      fetchData();
    }
    
  }, [username]);

  useEffect(() => {
    
    if (skillData.length > 0 && skillsset && knownSkills.length>0) {
      const skillstring = knownSkills[0].skills;
      const skillarray = skillstring.split(",");
      const filteredSkills = skillData.filter(skill => skillsset.includes(skill.skillname));
      const missingSkills = filteredSkills.filter(skill => !skillarray.includes(skill.skillname));
      setGapSkills(missingSkills);
    }
  }, [skillData, skillsset, knownSkills]);
  useEffect(() => {
    const Slider = (() => {
      let total,
        $slide,
        $slider,
        sliderWidth,
        increment = 120;
      
      const on = () => {
        $slider = $(".slider");
        $slide = $(".slide");
        sliderWidth = $slider.width();
        total = $slide.length;
        position();
      };
      
      const position = () => {
        let sign,
          half = $(".active").index(),
          x = 0,
          z = 0,
          zindex,
          scaleX = 1.3,
          scaleY = 1.3,
          transformOrigin;
        
        $slide.each((index, element) => {
          scaleX = scaleY = 1;
          transformOrigin = sliderWidth / 2;
          
          if (index < half) {
            sign = 1;
            zindex = index + 1;
            x = sliderWidth / 2 - increment * (half - index + 1);
            z = -increment * (half - index + 1);
          } else if (index > half) {
            sign = -1;
            zindex = total - index;
            x = sliderWidth / 2 + increment * (index - half + 1);
            z = -increment * (index - half + 1);
          } else {
            sign = 0;
            zindex = total;
            x = sliderWidth / 2;
            z = 1;
            scaleX = scaleY = 1.2;
            transformOrigin = "initial";
          }
          
          $(element).css({
            transform:
              `translate3d(${calculateX(x, sign, 300)}px, 0, ${z}px) scale3d(${scaleX}, ${scaleY}, 1)`,
            "z-index": zindex,
            "transform-origin-x": transformOrigin
          });
        });
      };
      
      const calculateX = (position, sign, width) => {
        switch (sign) {
          case 1:
          case 0:
            return position - width / 2;
          case -1:
            return position - width / 2;
          default:
            return position;
        }
      };
      
      const imageSize = () => {
        return $slider.width() / 3;
      };
      
      const recalculateSizes = () => {
        sliderWidth = $slider.width();
        position();
      };
      const clickedImage = function () {
        $(".active").removeClass("active");
        $(this).addClass("active");
        position();
      };
      
      
      
      const addEvents = () => {
        $(window).resize(recalculateSizes);
        $(document).on("click", ".slide", clickedImage);
      };
      
      return {
        init: () => {
          on();
          addEvents();
        }
      };
    })();


    
    Slider.init();
  }, [gapskills]);

  // if(knownSkills.length>0){
    
  //   console.log(skillarray)
  // }

 

  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    nav('/');
  };

  const deleteSkills = () => {
    localStorage.removeItem('skills');
    nav('/roadmap');
  };

  if (!isLoggedIn) {
    nav('/login');
  }

  return (
    <div className="map-contanier">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" onClick={() => { nav('/'); }}></img>
        </div>
        <ul className="nav-links">
          <li><a onClick={deleteSkills}>Jobs</a></li>
          <li><a href="profile">Hello {username}</a></li>
          <li><a href="" className="landinglogin-button" onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
      <h1 className="main-title">Roadmap for {designation}</h1>
      <div className="slider">
        {gapskills.length === 0 ?(
          <div className="slide">
          <div className="slide-container">
            <h1 className="slide-Title">Congratulations!!! You can Apply for {designation}</h1>
          </div>
          </div>
        ):(
          gapskills.length>0 && gapskills.map((skill) => (
            <div className="slide" key={skill.skillname}>
              <div className="slide-container">
                <h2 className="slide-Title">{skill.skillname}</h2>
                <div className="slide-description">
                  <ul>
                    <li>{skill.description}</li><br></br>
                    <li>Gain Knowledge: <a href={skill.gainknowledge}>{skill.gainknowledge}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
        
  
      </div>
    </div>
  );
};

export default Maps;
