import { Get, Post } from "./protocols";

export async function getSessionUser(){
  return await Get('/session');
}

export async function login(email, password){
  return await Post('/login', { username: email, password });
}