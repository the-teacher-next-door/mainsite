import React from "react";

const Column = props => (
  <div
    className={`column ${props.className === undefined ? "" : props.className}`}
    id={props.id === undefined ? "" : props.id}
  >
    {props.children}
  </div>
);

export default Column;
