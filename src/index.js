import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/App.css";

import "./assets/styles/Icons.css";
import App from "./routes/App";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers, // Todos los reducers
  {}, // Estado inicial
  //   composeEnhancers(),
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
