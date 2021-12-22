import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  IS_LOGGED_IN,
  TOKEN_SEND_SUCCESS,
  TOKEN_SEND_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  BOOKING_SUCCESSFUL,
  BOOKING_FAILED,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  CREATE_NEW_SERVICE_SUCCESS,
  CREATE_NEW_SERVICE_FAIL,
  GET_TYPE_NAME_WITH_ID_SUCCESS,
  GET_TYPE_NAME_WITH_ID_FAIL

} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user,users:[],data:[]  }
  : { isLoggedIn: false, user: null,users:[],data:[] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.data,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: false,
        user: payload.user,
      };

    case TOKEN_SEND_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case TOKEN_SEND_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case BOOKING_SUCCESSFUL:
      return {
        ...state,
        isLoggedIn: true,
        booking: payload.Booking,
      };
    case BOOKING_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        booking: null,
      };
      case GET_USERS_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          users: payload.response.users,
        };
        case GET_USERS_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
        case CREATE_NEW_SERVICE_SUCCESS:
          return {
            ...state,
            isLoggedIn:true,
            data:payload.data
          };
          case CREATE_NEW_SERVICE_FAIL:
          return {
            ...state,
            isLoggedIn:true,
            data:null
          }
          case GET_TYPE_NAME_WITH_ID_SUCCESS:
            return {
              ...state,
              isLoggedIn:true,
              data:payload.data
            }
            case GET_TYPE_NAME_WITH_ID_FAIL:
              return {
                ...state,
                isLoggedIn:true,
                data:null
              }

    default:
      return state;
  }
}
