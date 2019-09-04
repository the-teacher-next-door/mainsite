import React from "react";

const Jumbotron = props => (
  <div
    className="jumbotron jumbotron-fluid"
    style={{
      backgroundImage: `url(${props.mainImage})`,
      backgroundSize: `cover`,
      backgroundPosition: `center`,
      margin: `0`,
      height: `70vh`
    }}
  >
    <div className="container">
      <h1 className="display-4">{props.h1}</h1>
      <p className="lead">{props.lead}</p>
    </div>
  </div>
);

export default Jumbotron;
