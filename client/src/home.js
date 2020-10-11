import React, { useEffect, useState } from 'react';
import { getFeedback, createFeedback, logout } from './api/rpc';

export default function Home() {

  const [state, setState] = useState({
    feedback: [],
    newFeedback: "",
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  async function fetchFeedback(){
    const res = await getFeedback();
    if(res.success){
      setState({...state, feedback: res.data, newFeedback: "" });
    }
  }

  async function handleCreateFeedback(){
    const res = await createFeedback(state.newFeedback);
    if(res.success){
      fetchFeedback();
    }
  }

  async function handleLogout(){
    const res = await logout();
    if(res.success){
      document.location.href = "/";
    }
  }

  return(
    <div>
      <button onClick={handleLogout}>Logout</button>
      <div>Feedback Sent:</div>
      { state.feedback.map((feedback, idx) => {
        return <div key={idx}>{feedback.payload}</div>
      })}
      <div>Send a new feedback:</div>
      <input value={state.newFeedback} onChange={(e) => {setState({...state, newFeedback: e.target.value})}}></input>
      <button onClick={handleCreateFeedback}>Send</button>
    </div>
  )
}