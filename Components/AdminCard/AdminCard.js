import React from "react";
import "./style.scss";
const AdminCard = props => {
  return (
    <div className="admin-card">
      <div>
        <p className="data">{props.data}</p>
        <p className="small-text">{props.smallText}</p>
      </div>
      <div className="icon">
        <i className="fas fa-newspaper"></i>
      </div>
    </div>
  );
};

export default AdminCard;
