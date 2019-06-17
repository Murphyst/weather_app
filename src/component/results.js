import React from "react";

export default class RequestedWeather extends React.Component {
  render() {
    return (
      <div>
        <p>City:{}</p>
        <p>Country:{}</p>
        <p>Weather:{}</p>
        <p>Humidity:{}</p>
      </div>
    );
  }
}
