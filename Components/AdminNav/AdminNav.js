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
            <a>books</a>
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
      <PBtn onClick={logout}>Logout</PBtn>
    </span>
    <style jsx>
      {`
        .admin-navbar {
          display: flex;
          height: 76px;
          align-items: center;
          background-color: #7c7093;
          padding: 0 130px;
          border-bottom: 1px solid #c6c6c6;
          margin-bottom: 30px;
        }
        .title {
          background: rgb(255, 255, 255);
          width: 100%;
          max-width: 145px;
          text-align: center;
          padding: 11px;
          color: #695395;
          font-weight: 700;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        #navbarNav {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        #navbarNav ul {
          margin: 0;
          height: 100%;
          display: flex;
          align-items: center;
        }

        #navbarNav .active {
          border-bottom: 3px solid #ffffff;
        }

        #navbarNav ul li {
          float: left;
          margin: 10px;
          height: 100%;
          display: flex;
          align-items: center;
        }
      `}
    </style>
  </nav>
);

export default AdminNav;
