import React, { useEffect, useState } from 'react';
import { getSessionUser } from './api/rpc';
import Home from './home';
import Login from './login';

export default function App() {

  useEffect(() => {
    void loadSessionUser();
  }, []);

  const [state, setState] = useState({
    user: null,
  });

  async function loadSessionUser(){
    const res = await getSessionUser();
    if(res.success){
      setState({...state, user: res.data});
    }
  } 

  return (
    <div className="App">
      { state.user ? <Home /> : <Login /> }
    </div>
  );
}