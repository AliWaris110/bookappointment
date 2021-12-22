import axios from "axios";
import { IS_LOGGED_IN, LOGIN_FAIL} from "../redux-store/actions/types";

export default {
  setupInterceptors: (store) => {
  
    // Add a response interceptor
    axios.interceptors.response.use(
      function (response) {
        console.log('from response function interceptors',response)
        return response;
      },
      function (error) {
        console.log('finding error itself from intersepctors: ',error.response.status)
        // console.log('from error function interceptors',error.response.status)
        //catches if the session ended!
        if (error.response.status=== 401) {
          console.log("EXPIRED TOKEN!",error);
          // localStorage.clear();
          store.dispatch({ type: IS_LOGGED_IN });
          window.location.reload()
          window.location.pathname="/login"
        }
          else if (error.response.status=== 403) {
          console.log("USER UNAUTHORIZED!");
          // localStorage.clear();
          window.location.reload()
          window.location.pathname="/verify-email"
          store.dispatch({ type: IS_LOGGED_IN });
        }
        else if (error.response.status=== 405) {
          console.log("Invalid Email or Password!");
          localStorage.clear();
          // window.location.reload()
          alert('password/Email mismatch!')
          store.dispatch({ type: LOGIN_FAIL });
          window.location.pathname="/login"
        }
        else if (error.response.status=== 404) {
          console.log("Page Not Found!");
          localStorage.clear();
          // window.location.reload()
          window.location.pathname="/notfound"
          store.dispatch({ type: IS_LOGGED_IN });
        }
        return Promise.reject(error);
      }
    );
  },
};
