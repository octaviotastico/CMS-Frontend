// Libraries
import axios from 'axios';

// Constants
import { API_URL } from '../Utils/constants';

export const getEvents = async (page, amount) => {
  const token = sessionStorage.getItem('token');
  if (page !== undefined && amount !== undefined) {
    const response = await axios.get(`${API_URL}/calendar/events?page=${page}&amount=${amount}&token=${token}`);
    return response.data;
  }
  const response = await axios.get(`${API_URL}/calendar/events?token=${token}`);
  return response.data;
};

export const getEvent = async (id) => {
  const response = await axios.get(`${API_URL}/calendar/event/${id}`);
  return response.data;
};

export const getCurrentEvents = async () => {
  const token = sessionStorage.getItem('token');
  const response = await axios.get(`${API_URL}/calendar/events/current?token=${token}`);
  return response.data;
};

export const getPastEvents = async () => {
  const token = sessionStorage.getItem('token');
  const response = await axios.get(`${API_URL}/calendar/events/past?token=${token}`);
  return response.data;
};

export const getUpcomingEvents = async () => {
  const token = sessionStorage.getItem('token');
  const response = await axios.get(`${API_URL}/calendar/events/upcoming?token=${token}`);
  return response.data;
};

export const postEvent = async (event) => {
  const response = await axios.post(`${API_URL}/calendar/events`, event);
  return response.data;
};

export const editEvent = async (id, event) => {
  const response = await axios.patch(`${API_URL}/calendar/event/${id}`, event);
  return response.data;
};

export const deleteEvent = async (id, event) => {
  const response = await axios.delete(`${API_URL}/calendar/event/${id}`, event);
  return response.data;
};
