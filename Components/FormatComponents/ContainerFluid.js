import React from "react";

const ContainerFluid = props => (
  <div
    className={`container-fluid ${
      props.className === undefined ? "" : props.className
    }`}
    id={props.id === undefined ? "" : props.id}
  >
    {props.children}
  </div>
);

export default ContainerFluid;
