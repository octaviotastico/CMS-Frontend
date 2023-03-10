// Libraries
import axios from "axios";

// Constants
import { API_URL } from "../Utils/constants";

export const getArticles = async (page, amount) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/learning/articles`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, amount },
  });
  return response.data;
};

export const getArticle = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/learning/article/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getArticleCategories = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/learning/articles/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getArticleTags = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/learning/articles/tags`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const postArticleCategory = async (category) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.post(`${API_URL}/learning/articles/category`, category, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getArticlesByCategories = async (category) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/learning/articles/category/${category}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const postArticle = async (article) => {
  const fd = new FormData();
  Object.keys(article).forEach((key) => fd.append(key, article[key]));

  const token = sessionStorage.getItem("token");
  const response = await axios.post(`${API_URL}/learning/articles`, fd, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const editArticle = async (id, article) => {
  const fd = new FormData();
  Object.keys(article).forEach((key) => fd.append(key, article[key]));

  const token = sessionStorage.getItem("token");
  const response = await axios.patch(`${API_URL}/learning/article/${id}`, fd, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteArticle = async (id, article) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/learning/article/${id}`, article, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
