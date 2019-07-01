import React from "react";
import Fav from "./Fav";

export default props => (
  <div className={"fav-wrapper"}>
    {!(props.favs > -1) && (
      <div className={"favourites"}>
        {props.favs.map(fav => (
          <Fav
            handleShowFav={props.handleShowFav}
            key={fav}
            favText={fav}
            handleDeleteFav={props.handleDeleteFav}
          />
        ))}
      </div>
    )}
  </div>
);
