// Libraries
import axios from "axios";

// Constants
import { API_URL } from "../Utils/constants";

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login/`, {
    username,
    password,
  });
  return response.data;
};

export const signup = async (username, password, firstName, lastName, email) => {
  const response = await axios.post(`${API_URL}/auth/signup/`, {
    username,
    password,
    firstName,
    lastName,
    email,
  });
  return response.data;
};

export const getAllUsers = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/users/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMyData = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserByID = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/users/id/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserByUsername = async (username) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/users/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (profile) => {
  const fd = new FormData();
  Object.keys(profile).forEach((key) => fd.append(key, profile[key]));

  const token = sessionStorage.getItem("token");
  const response = await axios.post(`${API_URL}/users/me`, fd, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
