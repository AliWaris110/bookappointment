import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from './App';
import store from "./redux-store/store";
import { Provider } from "react-redux";
import NetworkService from "./services/network.service";


document.title="Booking Appointment | Systems"

NetworkService.setupInterceptors(store);

ReactDOM.render(
 
    <Provider store={store}>
      <App />
    </Provider>
 ,
  document.getElementById("root")
);
