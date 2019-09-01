import React from "react";
import PBtn from "../PBtn";
import api from "../../utils/api";
import Link from "next/link";
const logout = () => {
  api.logout().then(done => {
    window.location.reload();
  });
};

const AdminNav = props => (
  <nav className={`container-fluid admin-navbar ${props.className}`}>
    <span className="title">Admin Panel</span>

    <div id="navbarNav">
      <ul>
        <li className="active">
          <Link href="/admin">
            <a>Blogs</a>
          </Link>
        </li>
        <li>
          <Link href="/admin-images">
            <a>Images</a>
          </Link>
        </li>
        <li>
          <Link href="/admin-slider">
            <a>Slider Images</a>
          </Link>
        </li>
        <li>
          <Link href="/admin-freebies">
            <a>Freebies</a>
          </Link>
        </li>
        <li>
          <Link href="/admin-books">
            <a>Books</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Go to Site</a>
          </Link>
        </li>
      </ul>
    </div>
    <span className="ml-auto">
      <PBtn onClick={logout}>
        <i className="fas fa-sign-out-alt"></i>
      </PBtn>
    </span>
  </nav>
);

export default AdminNav;
