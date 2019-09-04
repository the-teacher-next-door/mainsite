import React, { useState, useEffect } from "react";
import Pattern from "../../images/Pattern.png";
const AdminPattern = props => {
  return (
    <div>
      <img src={Pattern} alt="" className="pattern" />
      <style jsx global>
        {`
          .pattern {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
          }
        `}
      </style>
    </div>
  );
};

export default AdminPattern;
