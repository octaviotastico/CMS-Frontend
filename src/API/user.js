// Libraries
import axios from 'axios';

// Constants
import { API_URL } from '../Utils/constants';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login/`, { username, password });
  return response.data;
};

export const signup = async (username, password, firstName, lastName, email) => {
  const response = await axios.post(`${API_URL}/auth/signup/`, {
    username, password, firstName, lastName, email,
  });
  return response.data;
};
