// Libraries
import axios from "axios";

// Constants
import { API_URL } from "../Utils/constants";

export const search = async (searchStr) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_URL}/search`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { search: searchStr },
  });
  return response.data;
};
