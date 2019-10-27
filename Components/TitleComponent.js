import React from "react";

const TitleComponent = props => {
  return (
    <div className="title-component medium-padding-bottom">
      <img src={props.img} alt="" />
      <h1 className="">{props.h1}</h1>
    </div>
  );
};

export default TitleComponent;
