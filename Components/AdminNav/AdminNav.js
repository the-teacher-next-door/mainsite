import React from "react";
import PBtn from "../PBtn";
import api from "../../utils/api";
import Link from "next/link";
import "./adminnav.scss";
const AdminNav = props => (
  <nav className="admin-sidebar">
    <aside className="menu">
      <p class="menu-label">MENU</p>
      <ul class="menu-list">
        <li>
          <Link href="/admin">
            <a className={props.active === "dashboard" ? "active" : ""}>
              Dashboard
            </a>
          </Link>
        </li>
        <li>
          <Link href="/admin-blogs">
            <a className={props.active === "blogs" ? "active" : ""}>Blogs</a>
          </Link>
        </li>
        <li>
          <Link href="/admin-images">
            <a className={props.active === "images" ? "active" : ""}>Images</a>
          </Link>
        </li>
        <li>
          <Link href="/admin-slider">
            <a className={props.active === "storeLinks" ? "active" : ""}>
              Store Links
            </a>
          </Link>
        </li>
        <li>
          <Link href="/admin-freebies">
            <a className={props.active === "freebies" ? "active" : ""}>
              Freebies
            </a>
          </Link>
        </li>
        <li>
          <Link href="/admin-books">
            <a className={props.active === "books" ? "active" : ""}>Books</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Go To Site</a>
          </Link>
        </li>
      </ul>
    </aside>
  </nav>
);

export default AdminNav;
