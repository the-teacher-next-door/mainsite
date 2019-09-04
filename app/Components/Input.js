import React from "react";
const Input = props => (
  <div>
    <input
      value={props.value}
      className={`mainInput ${props.className}`}
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.onChange}
      id={props.id}
      defaultValue={props.defaultValue}
    />
    <style jsx>{``}</style>
  </div>
);

export default Input;
