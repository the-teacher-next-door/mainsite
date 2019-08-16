import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import Socials from "./Socials";
const FooterNext = props => {
  return (
    <nav class="navbar">
      <div className="container">
        <div class="navbar-brand"></div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">
            <span>
              <ul>
                <li>Copyright</li>
                <li>
                  <span>
                    <i class="far fa-copyright"></i>{" "}
                  </span>
                </li>
                <li>2019 The Teacher Next Door</li>
              </ul>
            </span>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
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
                  {props.user ? (
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
                <li>
                  <SearchBar history={props.history} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FooterNext;
