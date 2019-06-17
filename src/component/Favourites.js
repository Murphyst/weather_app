import React from "react";
import Fav from "./Fav";
import { FaHeart } from "react-icons/fa";

export default props => (
  <div>
    <button onClick={props.handleFav}>
      <FaHeart />
    </button>
    {props.favs.map(fav => (
      <Fav key={fav} favText={fav} handleDeleteFav={props.handleDeleteFav} />
    ))}
  </div>
);
