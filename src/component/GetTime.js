import React from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const Api_Key = "4BQCMBKV9ZKX";
export default class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      abbreviation: ""
    };
  }

  handleTimeZone = async () => {
    const timeZone = this.props.timeZone;
    try {
      const timeApi_call = await fetch(
        `
        http://api.timezonedb.com/v2.1/get-time-zone?key=${Api_Key}&format=json&by=zone&zone=${timeZone}`
      );
      const timeResponse = await timeApi_call.json();

      const timer = new Date(timeResponse.formatted);
      const time = timer.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
      this.setState({
        time: time,
        abbreviation: timeResponse.abbreviation
      });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidUpdate() {
    this.handleTimeZone();
  }
  render() {
    return (
      <div className={"get-time"}>
        {this.props.cityName && (
          <p className={"city-name"}>{this.props.cityName}</p>
        )}

        {this.props.cityName && (
          <div onClick={this.props.handleFav}>
            {this.props.favs.indexOf(this.props.cityName) > -1 ? (
              <FaHeart className={"fav-button"} />
            ) : (
              <FiHeart className={"fav-button"} />
            )}
          </div>
        )}

        <div className={"timer"}>
          {this.state.time !== "Invalid Date" && this.props.cityName && (
            <p className={"clock"}>
              {this.state.abbreviation} {this.state.time}
            </p>
          )}
        </div>
      </div>
    );
  }
}
