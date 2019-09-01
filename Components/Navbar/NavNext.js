import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Link from "next/link";
import Socials from "../Socials";
import Container from "../FormatComponents/Container";
import Column from "../FormatComponents/Column";
import Columns from "../FormatComponents/Columns";
import MobileNavPanel from "./MobileNavPanel";
import Logo from "../../images/logo.png";
const NavNext = ({ user, history }) => {
  const [show, setShow] = useState("no-show");

  const toggleShow = () => {
    if (show === "no-show") {
      setShow("show");
    } else {
      setShow("no-show");
    }
  };
  return (
    <nav class="navbar">
      <Container>
        <Columns>
          <Column className="is-12 left">
            <button className="menuIcon" onClick={toggleShow}>
              <i className="fas fa-bars"></i>
            </button>
          </Column>
          <Column className="is-12 right ">
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
                {user ? (
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
                <SearchBar history={history} />
              </li>
            </ul>
          </Column>
        </Columns>
      </Container>
      <MobileNavPanel show={show} />
      <div className={`overlay ${show}`} onClick={toggleShow}></div>
      <div className="mobile-logo">
        <img src={Logo} />
      </div>
    </nav>
  );
};

export default NavNext;
