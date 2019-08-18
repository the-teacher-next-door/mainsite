import React from "react";

const TitleComponent = props => {
  return (
    <>
      <img src={props.img} alt="" />
      <h1 className="medium-padding-bottom">{props.h1}</h1>
    </>
  );
};

export default TitleComponent;
