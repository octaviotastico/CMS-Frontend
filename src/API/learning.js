import axios from "axios";
import { API_URL } from "../Utils/constants";

export const getArticles = async (page, amount) => {
  if (page !== undefined && amount !== undefined) {
    const response = await axios.get(`${API_URL}/learning/articles?page=${page}&amount=${amount}`);
    return response.data;
  }
  const response = await axios.get(`${API_URL}/learning/articles`);
  return response.data;
};

export const getArticle = async (id) => {
  const response = await axios.get(`${API_URL}/learning/article/${id}`);
  return response.data;
};

export const getArticleCategories = async () => {
  const response = await axios.get(`${API_URL}/learning/articles/categories`);
  return response.data;
};

export const postArticleCategory = async (category) => {
  const response = await axios.post(`${API_URL}/learning/articles/category`, category);
  return response.data;
};

export const getArticlesByCategories = async (category) => {
  const response = await axios.get(`${API_URL}/learning/articles/category/${category}`);
  return response.data;
};

export const postArticle = async (article) => {
  const response = await axios({
    method: "post",
    url: `${API_URL}/learning/articles`,
    data: article,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    }
  });
  return response.data;
};

export const editArticle = async (id, article) => {
  const response = await axios.patch(`${API_URL}/learning/article/${id}`, article);
  return response.data;
};

export const deleteArticle = async (id, article) => {
  const response = await axios.delete(`${API_URL}/learning/article/${id}`, article);
  return response.data;
};
