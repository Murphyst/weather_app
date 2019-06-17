import React from "react";
import ReactDOM from "react-dom";

import City from "./component/City";
import Favourites from "./component/Favourites";

const Api_Key = "ed89f6fe37812395b00cb5cf80fe3c64";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: [],
      favs: [],
      error: null,
      city: "",
      country: "",
      tepmerature: "",
      humidity: "",
      description: ""
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem("favs");
      const favs = JSON.parse(json);

      if (favs) {
        this.setState(() => ({ favs }));
      }
    } catch (e) {
      console.log("Something has happened even if nothing has happened");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.favs.length !== this.state.favs.length) {
      const json = JSON.stringify(this.state.favs);
      localStorage.setItem("favs", json);
    }
  }

  handleCity = async input => {
    if (!input) {
      return "Please enter a city!";
    } else {
      const api_call = await fetch(
        `api.openweathermap.org/data/2.5/weather?q=${input}&appid=${Api_Key}`
      );
      const response = await api_call.json();
      console.log(response);
    }
    console.log(city);
    this.setState(() => ({ input }));
  };

  handleFav = () => {
    const fav = this.state.input;
    if (this.state.favs.indexOf(fav) > -1) {
      this.setState(() => ({
        error: "This city has already been added to the favourites"
      }));
    } else {
      this.setState(prevState => ({ favs: prevState.favs.concat(fav) }));
    }
  };

  handleDeleteFav = favToRemove => {
    this.setState(prevState => ({
      favs: prevState.favs.filter(fav => favToRemove !== fav)
    }));
  };
  render() {
    return (
      <div>
        <City handleCity={this.handleCity} input={this.state.input} />
        {this.state.error && <p>{this.state.error}</p>}
        <Favourites
          handleDeleteFav={this.handleDeleteFav}
          handleFav={this.handleFav}
          favs={this.state.favs}
        />
        {/* {this.state.input.length > 0 && alert(this.state.input)} */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
