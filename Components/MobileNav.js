import React, { useState, useEffect } from "react";
import MobileNavPanel from "./MobileNavPanel";

const MobileNav = ({ user }) => {
  const [show, setShow] = useState("no-show");

  const toggleShow = () => {
    if (show === "no-show") {
      setShow("show");
    } else {
      setShow("no-show");
    }
  };
  return (
    <div className="container-fluid mobileNav">
      <div className="columns toolbar ">
        <div className="column is-6">
          {/* hamburger menu */}
          <button className="menuIcon" onClick={toggleShow}>
            <i className="fas fa-bars"></i> Menu
          </button>
        </div>
      </div>
      <MobileNavPanel user={user} show={show} />
      <div className={`overlay ${show}`} onClick={toggleShow}></div>
    </div>
  );
};

export default MobileNav;