import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

export default props => (
  <div>
    {props.favText}
    <button onClick={fav => props.handleDeleteFav(props.favText)}>
      <IoIosCloseCircle />
    </button>
  </div>
);
