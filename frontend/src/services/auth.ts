import axios from "axios";

const API_URL = "http://localhost:3000";

//Login
export const login = async (username: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });

  const token = res.data.token;
  localStorage.setItem("token", token);

  return token;
};

//register
export const register = async (username: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/register`, {
    username,
    password,
  });

  const token = res.data.token;
  localStorage.setItem("token", token);

  return token;
};