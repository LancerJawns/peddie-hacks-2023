import {authorize} from 'react-native-app-auth';

import {hasItem, getItem, setItem} from './storage';
import axios from 'axios';

export const register = async (username, password) => {
  return axios.post(`/auth/register`, {username, password});
};

export const login = async (username, password) => {
  const token = await axios.post('/auth/login', {username, password});

  console.log(token);

  //   setItem('token', token);

  return token;
};
