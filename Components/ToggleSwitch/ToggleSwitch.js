import React from "react";
const ToggleSwitch = props => (
  <div className="check">
    <input
      type="checkbox"
      id="switch"
      onChange={props.checkboxChange}
      checked={props.checked}
    />
    <label htmlFor="switch">Toggle</label>
    <style jsx global>
      {`
        .check input[type="checkbox"] {
          height: 0;
          width: 0;
          visibility: hidden;
        }

        .check label {
          cursor: pointer;
          text-indent: -9999px;
          width: 40px;
          height: 20px;
          background: grey;
          border-radius: 100px;
          position: relative;
          top: 5px;
        }

        .check label:after {
          content: "";
          position: absolute;
          top: 0px;
          left: 0px;
          width: 20px;
          height: 20px;
          background: #fff;
          border-radius: 90px;
          transition: 0.3s;
        }

        .check input:checked + label {
          background: #00cafa;
        }

        .check input:checked + label:after {
          left: calc(100%);
          transform: translateX(-100%);
        }

        .check label:active:after {
          width: 10px;
        }
      `}
    </style>
  </div>
);

export default ToggleSwitch;
