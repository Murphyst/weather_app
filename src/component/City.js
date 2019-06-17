import React from "react";

export default class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    };
  }

  handleCity = async e => {
    if (e.key === "Enter") {
      e.preventDefault();

      const input = e.target.value.trim();
      const error = this.props.handleCity(input);

      this.setState(() => {
        return { error };
      });

      document.getElementById("city").value = "";
    }
  };

  render() {
    return (
      <div>
        <h1>This page is for city and country inputs</h1>
        <form>
          <input
            onKeyPress={this.handleCity}
            type="text"
            name="city"
            placeholder="city"
            id="city"
          />
          <input type="text" name="country" placeholder="country" />
          {/* <button /> */}
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}
