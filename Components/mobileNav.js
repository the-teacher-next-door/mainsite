import React from "react";
import SearchBar from "../Components/SearchBar";

const MobileNav = props => {
  return (
    <div className="container-fluid mobileNav">
      <div className="columns toolbar">
        <div className="column">
          {/* hamburger menu */}
          <button>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className="column">
          {/* search bar */}
          {/* <SearchBar /> */}
        </div>
      </div>
      <div className="navPanel">{/* nav and icons */}</div>
    </div>
  );
};

export default MobileNav;
