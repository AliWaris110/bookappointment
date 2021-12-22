import axios from "axios";
import authHeader from "./auth-header";
import config from '../config'
const API_URL = `${config.BASE_URL}/api/booking`;
const API_URL_PROFILE = `${config.BASE_URL}/api`;
const getPublicContent = () => {
  return axios.get(API_URL + "/");
};

const getUserBoard = () => {
  return axios.get(API_URL_PROFILE + "/user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "/mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL_PROFILE + "/user/current", {
    headers: authHeader(),
  });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
