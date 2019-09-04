import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Link from "next/link";
import Socials from "../Socials";
import MobileIcons from "../MobileIcons";
import Column from "../FormatComponents/Column";
const MobileNavPanel = props => (
  <div className={"navPanel columns is-multiline is-centered " + props.show}>
    <Column className="is-12">
      <Link href="/">
        <a>HOME</a>
      </Link>
    </Column>
    <Column className="is-12">
      <Link href="/my-blog">
        <a>BLOG</a>
      </Link>
    </Column>
    <Column className="is-12">
      <Link href="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door">
        <a>MY STORE</a>
      </Link>
    </Column>
    <Column className="is-12">
      {props.user ? (
        <Link href="/teacher-freebies">
          <a>FREEBIES</a>
        </Link>
      ) : (
        <Link href="/freebies-register">
          <a>FREEBIES</a>
        </Link>
      )}
    </Column>
    <Column className="is-12">
      <Link href="/meet-jenn">
        <a>MEET JENN</a>
      </Link>
    </Column>
    <Column className="is-12">
      <Link href="/contact">
        <a>CONTACT</a>
      </Link>
    </Column>
    <Column className="is-12">
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
    </Column>
    <Column>
      <SearchBar />
    </Column>
    <MobileIcons />
  </div>
);

export default MobileNavPanel;
