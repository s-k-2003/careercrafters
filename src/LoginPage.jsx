import React, { useEffect } from 'react';
import './LoginPage.css'
import { useState } from 'react';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function LoginPage() {
    const nav = useNavigate();

    const [username, setName] = useState('');
  const [pasword, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const username = localStorage.getItem('user');
    setIsLoggedIn(!!username);
    if(isLoggedIn){
      nav('/')
    }
  })

    const handleLogin= async(event)=>{
        if(!username && !pasword){
            event.preventDefault();
        }else{
            try{
                const response = await axios.post('http://localhost:8080/careercrafters/logindata/auth', {username,pasword});

                if(response.data === "Login Successful"){
                    alert('Correct password')
                    sessionStorage.setItem('user',username)
                    localStorage.setItem('user',username)
                    nav('/home')
                }else{
                    console.log(response.data);
                    alert('Invalid username or password');
                    event.preventDefault();
                }
            }catch(error){
                alert(error);
            }
        }
    }
    return (
        <>
        
        <div className='loginbody'>
        <main className="main">
          <div className="container">
            <section className="wrapper">
              <div className="heading">
                <h1 className="text text-large">Sign In</h1>
                <p className="text text-normal">
                  New user?{' '}
                  <span>
                    <a href="register" className="text text-links">
                      Create an account
                    </a>
                  </span>
                </p>
              </div>
              <form name="signin" className="form">
                <div className="input-control">
                  <label htmlFor="email" className="input-label" hidden>
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="input-field"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setName(event.target.value)}
                    required
                    />
                </div>
                <div className="input-control">
                  <label htmlFor="password" className="input-label" hidden>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="input-field"
                    placeholder="Password"
                    value={pasword}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    />
                </div>
                <div className="input-control">
                  <a href="#" className="text text-links">
                    Forgot Password
                  </a>
                  <div className="input-submit" onClick={handleLogin}>Login</div>
                </div>
                
              </form>
            </section>
          </div>
        </main>
    </div>
                    </>
      );
}

export default LoginPage;
