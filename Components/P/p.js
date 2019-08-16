import React from "react";

const P = props => {
  return (
    <p className={props.className} id={props.id}>
      {props.children}
    </p>
  );
};

export default P;
