//////////register/login/logout actions//////////

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  TOKEN_SEND_FAIL,
  TOKEN_SEND_SUCCESS,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  BOOKING_SUCCESSFUL,
  BOOKING_FAILED,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_BY_ADMIN_SUCCESS,
  ADD_USER_BY_ADMIN_FAIL,
  GET_SERVICE_TYPES_SUCCESSFUL,
  GET_SERVICE_TYPES_FAIL,
  CREATE_NEW_SERVICE_SUCCESS,
  CREATE_NEW_SERVICE_FAIL,
  GET_BOOKINGS_SUCCESSFUL,
  GET_BOOKINGS_FAIL,
  GET_TYPE_NAME_WITH_ID_SUCCESS,
  GET_TYPE_NAME_WITH_ID_FAIL,
} from "./types";

import AuthService from "../../services/auth.service";

export const register =
  (firstName, lastName, email, password) => (dispatch) => {
    return AuthService.register(firstName, lastName, email, password).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    ({ data, statusCode }) => {
     
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { data },
      });

      return Promise.resolve(data);
    },
    (error) => {
      console.log("Error issue is here ", error.response.status);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response);
    }
  );
};

export const verifyToken = (token) => (dispatch) => {
  return AuthService.verifyToken(token).then(
    ({ data }) => {
      dispatch({
        type: VERIFY_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: VERIFY_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response);
    }
  );
};

export const sendToken = (email) => (dispatch) => {
  return AuthService.sendToken(email).then(
    ({ data }) => {
      dispatch({
        type: TOKEN_SEND_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: TOKEN_SEND_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response);
    }
  );
};



export const passwordReset = (token,password,confirmPassword) => (dispatch) => {
  return AuthService.passwordReset(token,password,confirmPassword).then(
    ({ data }) => {
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: PASSWORD_RESET_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response);
    }
  );
};

////addUserByAdmin///////
export const addUserByAdmin = (role,firstName,lastName,email,password) => (dispatch) => {
  return AuthService.addUserByAdmin(role,firstName,lastName,email,password).then(
    ({ data }) => {
      dispatch({
        type: ADD_USER_BY_ADMIN_SUCCESS,
        payload: { data },
      });

      return Promise.resolve(data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: ADD_USER_BY_ADMIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response);
    }
  );
};


/////service type////
export const getAllServiceTypes = () => (dispatch) => {
  return AuthService.getAllServiceTypes().then(
    ( {types} ) => {
      dispatch({
        type: GET_SERVICE_TYPES_SUCCESSFUL,
        payload: { types },
      });

      return Promise.resolve(types);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_SERVICE_TYPES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response);
    }
  );
};


////create new service/////
export const createNewService = (title,venue,location,typeId) => (dispatch) => {
  return AuthService.createNewService(title,venue,location,typeId).then(
    ({ data }) => {
      dispatch({
        type: CREATE_NEW_SERVICE_SUCCESS,
        payload: { data },
      });

      return Promise.resolve(data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: CREATE_NEW_SERVICE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response);
    }
  );
};



////getBookings////////

export const getAllBooking = () => (dispatch) => {
  console.log('in auth.js')
  return AuthService.getAllBooking().then(
    (bookings ) => {
      console.log('Booking data in auth.js: ',bookings)
      dispatch({
        type: GET_BOOKINGS_SUCCESSFUL,
        payload: { bookings },
      });

      return Promise.resolve(bookings);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_BOOKINGS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response);
    }
  );
};



export const saveBooking = (id,newData) => (dispatch) => {
  console.log('in auth.js')
  return AuthService.saveBooking(id,newData).then(
    (booking ) => {
      console.log('Booking data in auth.js: ',booking)
      dispatch({
        type: BOOKING_SUCCESSFUL,
        payload: { booking },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: BOOKING_FAILED,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response);
    }
  );
};






export const getAllUsers = () => (dispatch) => {
  return AuthService.getAllUsers().then(
    (response ) => {
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: { response},
      });
      return Promise.resolve(response);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_USERS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response);
    }
  );
};



////getServiceTypeNameWithTypeId////
export const getServiceTypeNameWithTypeId = (id) => (dispatch) => {
  return AuthService.getServiceTypeNameWithTypeId(id).then(
    (response ) => {
      dispatch({
        type: GET_TYPE_NAME_WITH_ID_SUCCESS,
        payload: { response},
      });
      return Promise.resolve(response);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_TYPE_NAME_WITH_ID_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response);
    }
  );
};




export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
