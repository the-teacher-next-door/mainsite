import React from "react";
import IconNav from './IconNav/IconNav';
import NavNext from "./Navbar/NavNext";
const Header = props => (
  <div className="container-fluid">
    <NavNext />
    <IconNav />
  </div>
);
export default Header;
