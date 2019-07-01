import React from "react";
import ReactDOM from "react-dom";

import WeatherApp from "./component/WeatherApp";

import "babel-polyfill";
import "./styles/styles.scss";
import "normalize.css/normalize.css";

ReactDOM.render(<WeatherApp />, document.getElementById("app"));
