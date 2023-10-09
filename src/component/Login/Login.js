import React from "react";
import './Login.css'
import { useState, useRef, useEffect } from "react";
import axios from "../../api/axios";

const LOGIN_URL = 'api/training/auth/token';

const Login = () => {

  const userRef = useRef();
  const errRef = useRef();

  const[user, setUser] = useState('');
  const[pwd, setPwd] = useState('');
  const[errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleOnChangeUserName = (event) => {
    setUser(event.target.value);
  }
  const handleOnChangePwd = (event) => {
    setPwd(event.target.value);
  }

  const handleFormSubmit = async(event) => {
    event.preventDefault();

    try{
        const response = await axios.post(LOGIN_URL, 
          JSON.stringify({username: user, password: pwd}),          
          {
            headers: {
                      'Content-Type': 'application/json'
                  }
          },
        ).then(response => {
          const accessToken = response?.data?.body?.access_token;
          localStorage.setItem('token', accessToken);
          setUser('');
          setPwd('');
          window.location.href = "/hscodes";
        });  
    } catch (err) {
        if(!err?.response) {
          setErrMsg('No server response');
        } else if (err?.response?.status === 400) {
          setErrMsg("Missing username or password");
        } else if (err?.response?.status === 401) {
          setErrMsg('UnAuthorized');
        } else {
          setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
  }

  return (
    <section>
      <p ref={errRef} className="{errMsg ? 'errmsg' : 'offscreen'}">{errMsg}</p>
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          ref={userRef}
          autoComplete="off"
          onChange={handleOnChangeUserName}
          value={user}
          required/>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          ref={userRef}
          onChange={handleOnChangePwd}
          value={pwd}
          required/>
          <button>Sign In</button>
      </form >
    </section>
  )
}

export default Login;