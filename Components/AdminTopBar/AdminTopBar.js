import React from "react";
import "./_style.scss";
import api from "../../utils/api";
import PBtn from "../PBtn";
const AdminTopBar = props => {
  const logout = () => {
    api.logout().then(done => {
      window.location.reload();
    });
  };
  return (
    <nav className="topBar">
      <div className="leftnav">
        <p>Admin Panel</p>
      </div>
      <div className="rightnav">
        <div>
          <form>
            <div className="field">
              {/* <div className="control has-icons-left">
                <input className="input" placeholder="Search" />
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>
              </div> */}
            </div>
          </form>
        </div>
        <div>
          <PBtn onClick={logout}>Logout</PBtn>
        </div>
      </div>
    </nav>
  );
};

export default AdminTopBar;
