import React, { useState } from 'react';
import { login, register } from './api/rpc';
import Home from './api/rpc';

export default function Login(props) {

  const [state, setState] = useState({
    email: "",
    password: "",
    status: "",
  });

  async function handleLogin(){
    const res = await login(state.email, state.password);
    if(res.success){
      document.location.href="/";
    }
    setState({...state, status: res.message });
  }

  async function handleRegister(){
    if(state.email == "" || state.password == ""){
      return setState({...state, status: "email/password cannot be empty" });
    }
    const res = await register(state.email, state.password);
    if(res.success){
      setState({...state, status: "successfully registered" });
    }
    setState({...state, status: res.message });
  }

  return(
    <div>
      <div>Email:</div>
      <div><input type="text" value={state.email} onChange={(e) => { setState({...state, email: e.target.value }) }}></input></div>
      <div>Password:</div>
      <div><input type="password" value={state.password} onChange={(e) => { setState({...state, password: e.target.value }) }}></input></div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      <div>{state.status}</div>
    </div>
  )
}