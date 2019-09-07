import React from "react";
const ToggleSwitch = props => (
  <div className="check">
    <label class="toggle">
      <input
        class="toggle-checkbox"
        type="checkbox"
        onChange={props.checkboxChange}
        checked={props.checked}
      />
      <div class="toggle-switch"></div>
    </label>
  </div>
);

export default ToggleSwitch;
