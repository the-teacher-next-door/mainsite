import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import Socials from "./Socials";
const MobileFooter = props => {
  return (
    <div class="navbar mobileFooter">
      <div className="container has-text-centered">
        <p>
          Copyright <i class="far fa-copyright"></i> 2019 The Teacher Next Door
        </p>
      </div>
    </div>
  );
};

export default MobileFooter;
