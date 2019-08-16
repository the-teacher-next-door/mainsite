import React, { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import Link from "next/link";
import Socials from "./Socials";
import MobileIcons from "./MobileIcons";
const TabletNav = ({ user, history }) => {
  const [show, setShow] = useState("no-show");

  const toggleShow = () => {
    if (show === "no-show") {
      setShow("show");
    } else {
      setShow("no-show");
    }
  };
  return (
    <div className="container-fluid tabletNav">
      <div className="columns toolbar is-centered">
        <div className="column is-6">
          {/* hamburger menu */}
          <button onClick={toggleShow}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className="column is-6">
          {/* search bar */}
          <SearchBar />
        </div>
      </div>
      <div className={"navPanel columns is-multiline is-centered " + show}>
        <div className="column is-12">
          <ul>
            <li>
              <Link href="/">
                <a>HOME</a>
              </Link>
            </li>
            <li>
              <Link href="/my-blog">
                <a>BLOG</a>
              </Link>
            </li>
            <li>
              <Link href="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door">
                <a>MY STORE</a>
              </Link>
            </li>
            <li>
              {user ? (
                <Link href="/teacher-freebies">
                  <a>FREEBIES</a>
                </Link>
              ) : (
                <Link href="/freebies-register">
                  <a>FREEBIES</a>
                </Link>
              )}
            </li>
            <li>
              <Link href="/meet-jenn">
                <a>MEET JENN</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>CONTACT</a>
              </Link>
            </li>
            <li>
              <Socials href="https://www.facebook.com/TheTeacherNextDoor">
                <i className="fab fa-facebook"></i>
              </Socials>
            </li>
            <li>
              <Socials href="https://www.instagram.com/theteachernextdoor/">
                <i className="fab fa-instagram"></i>
              </Socials>
            </li>
            <li>
              <Socials href="https://www.pinterest.com/TeacherNextDoor/">
                <i className="fab fa-pinterest-square"></i>
              </Socials>
            </li>
            <li>
              <Socials href="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door">
                TpT
              </Socials>
            </li>
          </ul>
        </div>
        <div className="column is-12">
          <MobileIcons />
        </div>
      </div>
    </div>
  );
};

export default TabletNav;
