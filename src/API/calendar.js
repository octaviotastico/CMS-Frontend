// Libraries
import axios from "axios";

// Constants
import { API_URL } from "../Utils/constants";

export const getEvents = async (page, amount) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/calendar/events`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, amount },
  });
  return response.data;
};

export const getEvent = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/calendar/event/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getCurrentEvents = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/calendar/events/current`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getPastEvents = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/calendar/events/past`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUpcomingEvents = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/calendar/events/upcoming`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const postEvent = async (event) => {
  const fd = new FormData();
  Object.keys(event).forEach((key) => fd.append(key, event[key]));

  const token = sessionStorage.getItem("token");
  const response = await axios.post(`${API_URL}/calendar/events`, fd, {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  });
  return response.data;
};

export const editEvent = async (id, event) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.patch(`${API_URL}/calendar/event/${id}`, event, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteEvent = async (id, event) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/calendar/event/${id}`, event, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
