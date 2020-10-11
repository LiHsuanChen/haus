import React, { useState } from 'react';
import { login } from './api/rpc';
import Home from './api/rpc';

export default function Login(props) {

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  async function handleLogin(){
    const res = await login(state.email, state.password);
    console.log(res);
    if(res.success){
      document.location.href="/";
    }
    console.log(res.message);
  }

  return(
    <div>
      <div>Email:</div>
      <div><input type="text" value={state.email} onChange={(e) => { setState({...state, email: e.target.value }) }}></input></div>
      <div>Password:</div>
      <div><input type="password" value={state.password} onChange={(e) => { setState({...state, password: e.target.value }) }}></input></div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}