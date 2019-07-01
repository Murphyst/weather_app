import React from "react";

import { FaAngleDoubleDown } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";

export default class Results extends React.Component {
  render() {
    return (
      <div className={"weatherContainer"}>
        <div className={"weatherDesc"}>
          <img src={this.props.descriptionIcon} />
          {this.props.description}
        </div>
        <div className={"weather"}>
          {this.props.temperature}
          <div>
            <div className={"degree"}>
              °
              <div className={"max"}>
                <p>
                  <FaAngleDoubleUp />
                </p>
                <p>{this.props.max}°</p>
              </div>
              <div className={"min"}>
                <p>
                  <FaAngleDoubleDown />
                </p>
                <p>{this.props.min}°</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
