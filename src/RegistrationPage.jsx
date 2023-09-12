import React from 'react';
import './RegistrationPage.css'
import { useNavigate} from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';



const RegistrationForm = () => {

    const navigate = useNavigate();
    const [firstName, setFname] = useState('');
    const [lastName, setLname] = useState('');
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [step, setStep] = useState(1);
    const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState('');
  const [designation, setDesignation] = useState('');

  

  const handleNextStep = () => {
    setStep(step + 1);
  };


    useEffect(()=>{
      const username = localStorage.getItem('user');
      setIsLoggedIn(!!username);
      if(isLoggedIn){
        navigate('/')
      }
    })

    const handleSubmit=(event)=>{
        const data = {
            username: username,
            email: email,
            pasword: password,
            firstName: firstName,
            lastName: lastName
          };

          const newdata = {
            username: username,
            pasword:password
          }

          
          
          const skilldata = {
            skills: skills.toString(),
            username: username,
            desired_designation: designation,
            summary: description
          }
          if (step === 1) {
            if(!firstName && !lastName && !email && !username && !password){
              event.preventDefault();
            }else{
              alert('Created new user')
              axios.post('http://localhost:8080/careercrafters/registerdata',data);
              axios.post('http://localhost:8080/careercrafters/logindata',newdata);
              handleNextStep();
            }
            
          } else if (step === 2) {
            if(!username && skills==[] && !designation && !description){
              event.preventDefault();
            }else{
              alert('User registration completed!');
            axios.post('http://localhost:8080/careercrafters/yourskills', skilldata);
            navigate('/login');
            }
            
          }
        }
        
    

    

  return (
    <div className="registration-form">
      <h2>User Registration</h2>
      {step == 1 && (
        <div>
          <h3 className='personal-details'>Personal Details</h3><br></br>
          <div className="input-group">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" placeholder="Enter your first name" value={firstName} onChange={(event) => setFname(event.target.value)}/>
      </div>
      <div className="input-group">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" placeholder="Enter your last name" value={lastName} onChange={(event) => setLname(event.target.value)}/>
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)}/>
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)}/>
      </div>
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Choose a username" value={username} onChange={(event) => setName(event.target.value)}/>
      </div>
      <div className="input-group">
        
        <a href="login" className="back-to-login">←Back to Login</a>
      </div>
      <button className="register-button" onClick={handleSubmit}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3 className='personal-details'>Skill Data</h3><br></br>
         <div className="input-group">
            <label htmlFor="designation">Designation</label>
            <input
            type="text"
            id="designation"
            placeholder="Your desired designation"
            value={designation}
            onChange={(event) => setDesignation(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea
            id="description"
            placeholder="Tell us about yourself..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className='skillcontainer'>
  <ul class="ks-cboxtags">
    <li>
      <input
        type="checkbox"
        id="checkboxOne"
        value="Programming"
        checked={skills.includes('Programming')}
        onChange={(event) => {
          const skill = event.target.value;
          if (skills.includes(skill)) {
            setSkills(skills.filter(item => item !== skill));
          } else {
            setSkills([...skills, skill]);
          }
        }}
      />
      <label for="checkboxOne">Programming</label>
    </li>
    <li>
      <input
        type="checkbox"
        id="checkboxTwo"
        value="HTML & CSS"
        checked={skills.includes('HTML & CSS')}
        onChange={(event) => {
          const skill = event.target.value;
          if (skills.includes(skill)) {
            setSkills(skills.filter(item => item !== skill));
          } else {
            setSkills([...skills, skill]);
          }
        }}
        
      />
      <label for="checkboxTwo">HTML & CSS</label>
    </li>
    <li>
      <input
        type="checkbox"
        id="checkboxThree"
        value="JavaScript"
        checked={skills.includes('JavaScript')}
        onChange={(event) => {
          const skill = event.target.value;
          if (skills.includes(skill)) {
            setSkills(skills.filter(item => item !== skill));
          } else {
            setSkills([...skills, skill]);
          }
        }}
      />
      <label for="checkboxThree">JavaScript</label>
    </li>
    <li>
      <input
        type="checkbox"
        id="checkboxFour"
        value="Web Development Framework"
        checked={skills.includes('Web Development Framework')}
        onChange={(event) => {
          const skill = event.target.value;
          if (skills.includes(skill)) {
            setSkills(skills.filter(item => item !== skill));
          } else {
            setSkills([...skills, skill]);
          }
        }}
      />
      <label for="checkboxFour">Web Development</label>
    </li>
    <li>
      <input
        type="checkbox"
        id="checkboxFive"
        value="CI/CD"
        checked={skills.includes('CI/CD')}
        onChange={(event) => {
          const skill = event.target.value;
          if (skills.includes(skill)) {
            setSkills(skills.filter(item => item !== skill));
          } else {
            setSkills([...skills, skill]);
          }
        }}
      />
      <label for="checkboxFive">CI/CD</label>
    </li>
  </ul>
</div>
<br></br>
<button className="register-button" onClick={handleSubmit}>Register</button>
 </div>
      )}
    </div>
  );
};

export default RegistrationForm;