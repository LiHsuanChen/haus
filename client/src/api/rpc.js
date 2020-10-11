import { Get, Post } from "./protocols";

export async function getSessionUser(){
  return await Get('/session');
}

export async function login(email, password){
  return await Post('/login', { username: email, password });
}

export async function logout(){
  return await Get('/logout');
}

export async function register(email, password){
  return await Post('/register', { email: email, password });
}

export async function getFeedback(){
  return await Get('/feedback');
}

export async function createFeedback(feedback){
  return await Post('/feedback', { feedback });
}