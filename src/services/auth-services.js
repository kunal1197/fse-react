import axios from "axios";
// const BASE_URL = "https://fse5500-node-app.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AUTH_API = `${BASE_URL}/api/auth`;

const api = axios.create({
  withCredentials: false,
});

export const signup = (user) =>
  api.post(`${AUTH_API}/signup`, user).then((response) => response.data);

export const login = (user) =>
  api.post(`${AUTH_API}/login`, user).then((response) => response.data);

export const logout = (user) =>
  api.post(`${AUTH_API}/logout`, user).then((response) => response.data);

export const profile = () =>
  api.post(`${AUTH_API}/profile`).then((response) => response.data);
