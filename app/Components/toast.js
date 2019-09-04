import React, { useState, useEffect } from "react";

const Toast = props => {
  return (
    <div className={`toast ${props.className}`}>
      <span className="icon">
        <i className="fas fa-exclamation-circle"></i>
      </span>
      <p>{props.text}</p>
    </div>
  );
};

export default Toast;
