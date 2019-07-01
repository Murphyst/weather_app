import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

export default props => (
  <div className={"fav"}>
    <button
      className={"fav-button"}
      onClick={fav => props.handleShowFav(props.favText)}
    >
      {props.favText}
    </button>

    <button
      className={"fav-button"}
      onClick={fav => props.handleDeleteFav(props.favText)}
    >
      <IoIosCloseCircle />
    </button>
  </div>
);
