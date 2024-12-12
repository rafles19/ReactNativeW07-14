import axios from "axios";
import Config from "react-native-config";

const API_URL = Config.API_URL;

export const getPosts = () => axios.get(`${API_URL}/posts`);

export const updatePost = (id: number, data: { title: string; body: string }) =>
  axios.put(`${API_URL}/posts/${id}`, data);
