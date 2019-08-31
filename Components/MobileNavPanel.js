import React from "react";
import SearchBar from "../Components/SearchBar";
import Link from "next/link";
import Socials from "./Socials";
import MobileIcons from "./MobileIcons";
const MobileNavPanel = props => (
  <div className={"navPanel columns is-multiline is-centered " + props.show}>
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
        <Socials href="https://www.instagram.com/theteachernextdoor/">
          <i className="fab fa-instagram"></i>
        </Socials>
        <Socials href="https://www.pinterest.com/TeacherNextDoor/">
          <i className="fab fa-pinterest-square"></i>
        </Socials>
        <Socials href="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door">
          TpT
        </Socials>
      </li>
      <li className="searchbar-li">
        <SearchBar />
      </li>
    </ul>
    <MobileIcons />
  </div>
);

export default MobileNavPanel;
