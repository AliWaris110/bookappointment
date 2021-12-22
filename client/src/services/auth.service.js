import axios from "axios";
import authHeader from "./auth-header";
import config from '../config'
const API_URL = `${config.BASE_URL}/api/auth/`;
const API_URL_VERIFY_TOKEN = `${config.BASE_URL}/api/user/`;
const API_URL_SAVE_BOOKING = `${config.BASE_URL}/api/booking/`;
const API_URL_TYPE = `${config.BASE_URL}/api/type/`;

const register = async (firstName, lastName, email, password) => {
  const response = await axios.post(API_URL + "register", {
    firstName,
    lastName,
    email,
    password,
  });
  return response;
};

const login = async (email, password) => {
  const response = await axios.post(API_URL + "login", {
    email,
    password,
  });
  if (response.data.jwtToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return { data: response.data, statusCode: response.status };
};

const verifyToken = async (token) => {
  const response = await axios.post(API_URL_VERIFY_TOKEN + "verify-email", {
    token,
  });

  return { data: response.data };
};

const sendToken = async (email) => {
  const response = await axios.post(API_URL_VERIFY_TOKEN + "forgot-password", {
    email,
  });

  return { data: response.data };
};

const passwordReset = async (token, password, confirmPassword) => {
  const response = await axios.post(API_URL_VERIFY_TOKEN + "reset-password", {
    token,
    password,
    confirmPassword,
  });

  return { data: response.data };
};

const addUserByAdmin = async (role, firstName, lastName, email, password) => {
  const response = await axios.post(API_URL + "register", {
    role,
    firstName,
    lastName,
    email,
    password,
  });
  return { data: response.data };
};

const saveBooking = async (id, newData) => {
  const response = await axios.patch(
    `${API_URL_SAVE_BOOKING}update/${id}`,
    { newData },
    { headers: authHeader() }
  );
  return { booking: response.data.Booking };
};

////GetAll Service Types
const getAllServiceTypes = async () => {
  const response = await axios.get(`${API_URL_TYPE}`);
  return { types: response.data.types };
};

////GetAll Bookings/////
const getAllBooking = async () => {
  const response = await axios.get(`${API_URL_SAVE_BOOKING}`, {
    headers: authHeader(),
  });
  return { data: response.data };
};

/////createNewService/////
const createNewService = async (title, venue, location, typeId) => {
  const response = await axios.post(
    `${API_URL_SAVE_BOOKING}createBooking`,
    {
      title,
      venue,
      location,
      typeId,
    },
    { headers: authHeader() }
  );
  console.log("service creation1: ", response);
  return { bookings: response.data.bookings };
};

////Get All users//////
const getAllUsers = async () => {
  const response = await axios.get(`${API_URL_VERIFY_TOKEN}`, {
    headers: authHeader(),
  });
  return response;
};

////GetServiceTypeNameWithId //////
const getServiceTypeNameWithTypeId = async (id) => {
  const response = await axios.get(`${API_URL_TYPE}getType/${id}`, {
    headers: authHeader(),
  });
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};
const redirectToLogin = (history) => {
  history.push("/login");
};

export default {
  register,
  login,
  logout,
  redirectToLogin,
  verifyToken,
  sendToken,
  passwordReset,
  saveBooking,
  addUserByAdmin,
  getAllServiceTypes,
  createNewService,
  getAllBooking,
  getAllUsers,
  getServiceTypeNameWithTypeId,
};
