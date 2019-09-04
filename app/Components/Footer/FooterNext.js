import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import Socials from "../Socials";
import Container from "../FormatComponents/Container";
const FooterNext = props => {
  return (
    <nav className="footer">
      <Container>
        <span className="left">
          <ul>
            <li>
              <p>
                Copyright <i class="far fa-copyright"></i> 2019 The Teacher Next
                Door
              </p>
            </li>
          </ul>
        </span>

        <span className="right">
          <ul>
            <li>
              <Link href="/">
                <a>
                  <p>Home</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/my-blog">
                <a>Blog</a>
              </Link>
            </li>
            <li>
              <Link href="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door">
                <a>My Store</a>
              </Link>
            </li>
            <li>
              {props.user ? (
                <Link href="/teacher-freebies">
                  <a>Freebies</a>
                </Link>
              ) : (
                <Link href="/freebies-register">
                  <a>Freebies</a>
                </Link>
              )}
            </li>
            <li>
              <Link href="/meet-jenn">
                <a>Meet Jenn</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
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
        </span>
      </Container>
    </nav>

    // <nav class="navbar">
    //   <Container>
    //     <div class="navbar-brand"></div>

    //     <div id="footerNav" class="navbar-menu">
    //       <div class="navbar-start">
    //         <span>
    //         </span>
    //       </div>
    //     </div>

    //     <div class="navbar-end">
    //       <div class="navbar-item">
    //         <div class="field is-grouped">
    //         </div>
    //       </div>
    //     </div>
    //   </Container>
    // </nav>
  );
};

export default FooterNext;
