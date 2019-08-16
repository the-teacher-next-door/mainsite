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
  </div>
);

export default ToggleSwitch;
