import React from "react";
import ReactDOM from "react-dom";

import CityForm from "./CityForm";
import Favourites from "./Favourites";
import Results from "./Results";
import GetTime from "./GetTime";

const Api_Key2 = "0e18f6b64c544b32bbe140221192506";
const Api_Key = "ed89f6fe37812395b00cb5cf80fe3c64";
export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favs: [],
      error: null,
      city: "",
      temperature: "",
      humidity: "",
      description: "",
      location: "",
      min: "",
      max: "",
      isLoading: false,
      imgUrl: "",
      timeZone: "",
      time: "",
      descriptionIcon: ""
    };
  }

  componentDidMount() {
    const json = localStorage.getItem("favs");
    const favs = JSON.parse(json);

    if (favs) {
      this.setState(() => ({ favs }));
    }
  }

  getCity = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value.trim();

    if (city) {
      try {
        this.setState({ isLoading: true });

        const api_call = await fetch(
          `http://api.apixu.com/v1/current.json?key=${Api_Key2}&q=${city}`
        );
        const response = await api_call.json();
        console.log(response);

        const api_call2 = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_Key}`
        );
        const body = await api_call2.json();
        console.log(body);

        const img_call = await fetch(
          `https://pixabay.com/api/?key=12850123-55b420bcd406fed05dfbc8049&q=${city}_city&image_type=photo`
        );

        const imgResponse = await img_call.json();
        console.log(imgResponse);
        var randomPhotoNumber = Math.floor(Math.random() * 10);

        if (imgResponse.hits.length == 0) {
          this.setState({ imgUrl: "https://picsum.photos/1200/1300" });
        } else if (imgResponse.hits.length == 1) {
          this.setState({
            imgUrl: imgResponse.hits[0].largeImageURL
          });
        } else {
          this.setState({
            imgUrl: imgResponse.hits[randomPhotoNumber].largeImageURL
          });
        }

        const descriptionIcon = `http://openweathermap.org/img/w/${
          body.weather[0].icon
        }.png`;
        this.setState({
          city: response.location.name,
          temperature: Math.round(response.current.temp_c),
          description: response.current.condition.text,
          min: Math.round(body.main.temp_min),
          max: Math.round(body.main.temp_max),
          error: null,
          isLoading: false,
          timeZone: response.location.tz_id,
          descriptionIcon: descriptionIcon
        });

        document.getElementById("app").style.backgroundImage = `url(${
          this.state.imgUrl
        })`;
      } catch (e) {
        this.setState({
          city: undefined,
          temperature: undefined,
          description: undefined,
          min: undefined,
          max: undefined,
          error: "City not found!",
          isLoading: false
        });
        document.getElementById("app").style.backgroundImage = "none";
      }
    } else {
      this.setState({
        error: "City not Found",
        city: "",
        imgUrl: ""
      });
      document.getElementById("app").style.backgroundImage = "none";
    }

    document.getElementById("city").value = "";
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.favs.length !== this.state.favs.length) {
      const json = JSON.stringify(this.state.favs);
      localStorage.setItem("favs", json);
    }
  }

  handleFav = () => {
    const fav = this.state.city;
    this.state.favs.indexOf(fav) > -1
      ? this.setState(prevState => ({
          favs: prevState.favs.filter(f => f !== fav)
        }))
      : this.setState(prevState => ({
          favs: prevState.favs.concat(fav)
        }));
  };

  handleDeleteFav = favToRemove => {
    this.setState(prevState => ({
      favs: prevState.favs.filter(fav => favToRemove !== fav)
    }));
  };

  handleShowFav = async city => {
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_Key}`
    );
    const response = await api_call.json();

    const api_call2 = await fetch(
      `http://api.apixu.com/v1/current.json?key=${Api_Key2}&q=${city}`
    );
    const response2 = await api_call2.json();
    const descriptionIcon = `http://openweathermap.org/img/w/${
      response.weather[0].icon
    }.png`;

    this.setState({
      city: response.name,
      temperature: Math.round(response.main.temp),
      description: response.weather[0].description,
      min: Math.round(response.main.temp_min),
      max: Math.round(response.main.temp_max),
      timeZone: response2.location.tz_id,
      descriptionIcon: descriptionIcon,
      error: null
    });

    const img_call = await fetch(
      `https://pixabay.com/api/?key=12850123-55b420bcd406fed05dfbc8049&q=${city}&image_type=photo`
    );
    const body = await img_call.json();
    var randomPhotoNumber = Math.floor(Math.random() * 10);
    if (body.hits.length == 0) {
      this.setState({ imgUrl: "https://picsum.photos/1200/1300" });
    } else if (body.hits.length == 1) {
      this.setState({
        imgUrl: body.hits[0].largeImageURL
      });
    } else {
      this.setState({
        imgUrl: body.hits[randomPhotoNumber].largeImageURL
      });
    }

    if (this.state.imgUrl) {
      document.getElementById("app").style.backgroundImage = `url(${
        this.state.imgUrl
      })`;
    }
  };
  render() {
    return (
      <div className={"wrapper"}>
        <CityForm
          isLoading={this.state.isLoading}
          getCity={this.getCity}
          error={this.state.error}
        />

        <GetTime
          handleDeleteFav={this.handleDeleteFav}
          handleFav={this.handleFav}
          cityName={this.state.city}
          favs={this.state.favs}
          timeZone={this.state.timeZone}
        />
        {this.state.city && (
          <Results
            min={this.state.min}
            max={this.state.max}
            temperature={this.state.temperature}
            description={this.state.description}
            descriptionIcon={this.state.descriptionIcon}
          />
        )}
        <Favourites
          handleShowFav={this.handleShowFav}
          city={this.state.city}
          handleDeleteFav={this.handleDeleteFav}
          handleFav={this.handleFav}
          favs={this.state.favs}
        />
      </div>
    );
  }
}
