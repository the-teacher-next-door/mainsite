import React from "react";

const Columns = props => (
  <div
    className={`columns ${
      props.className === undefined ? "" : props.className
    }`}
    id={props.id === undefined ? "" : props.id}
  >
    {props.children}
  </div>
);

export default Columns;
