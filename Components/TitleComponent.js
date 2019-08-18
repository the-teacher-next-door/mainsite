import React from "react";

const TitleComponent = props => {
  return (
    <div className="title-component">
      <img src={props.img} alt="" />
      <h1 className="medium-padding-bottom">{props.h1}</h1>
    </div>
  );
};

export default TitleComponent;
