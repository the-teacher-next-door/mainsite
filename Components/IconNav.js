import React from "react";
import Logo from "../images/logo.png";
import BookIcon from "../images/BookIcon.png";
import Calc from "../images/Calc.png";
import Light from "../images/Light.png";
import Mug from "../images/Mug.png";
import Pencil from "../images/Pencil.png";
import Link from "next/link";
import PBtn from "./PBtn";
const IconNav = props => (
  <nav
    className="navbar white icon-nav"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-start">
        <img src={Logo} alt="" className="logo image " />
        <img src="" alt="" />
      </div>
      <div className="navbar-end">
        <ul>
          <li>
            <Link as={`/reading`} href="/reading?q=reading">
              <a className="icon-link-tags">
                <img src={BookIcon} className="icons image" alt="" />
                Reading
              </a>
            </Link>
          </li>
          <li>
            <Link as={`/writing`} href="/writing?q=writing">
              <a className="icon-link-tags">
                <img src={Pencil} className="icons image" alt="" />
                Writing & Grammar
              </a>
            </Link>
          </li>
          <li>
            <Link as={`/math`} href="/math?q=math">
              <a className="icon-link-tags">
                <img src={Calc} className="icons image" alt="" />
                Math
              </a>
            </Link>
          </li>
          <li>
            <Link as={`/holidays`} href="/holidays?q=holidays">
              <a className="icon-link-tags">
                <img src={Mug} className="icons image" alt="" />
                Holidays
              </a>
            </Link>
          </li>
          <li>
            <Link as={`/ideas`} href="/ideas?q=ideas">
              <a className="icon-link-tags">
                <img src={Light} className="icons image" alt="" />
                Classroom Ideas
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default IconNav;
