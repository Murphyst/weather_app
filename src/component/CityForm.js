import React from "react";

export default props => {
  return (
    <div>
      <form
        disabled={props.isLoading}
        autoComplete={"off"}
        onSubmit={props.getCity}
        className={"form"}
      >
        <input
          className={"input"}
          type="text"
          name="city"
          id="city"
          placeholder={props.error ? "City Not Found!" : "Enter City"}
        />
        <button className="button">
          <p>Get Weather</p>
        </button>
      </form>
    </div>
  );
};
