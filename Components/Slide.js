import React from "react";

const Slide = props => (
  <div className="slide">
    <div className="image">
      <img className="slider-img" src={props.img} alt="slide" />
    </div>
    <div className="header">
      <p>
        {props.title.length > 20
          ? `${props.title.substring(0, 20)}...`
          : props.title}
      </p>
      <span className="category">{props.category.split(",")[0]}</span>
    </div>
  </div>
);

export default Slide;
