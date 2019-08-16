import React, { useState, useEffect } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import PBtn from "../Components/PBtn";
import Link from "next/link";
import api from "../utils/api";
import Layout from "../Components/Layout/Layout";
import Toast from "../Components/toast";
const Admin = props => {
  const [blogs, setBlogs] = useState([]);
  const [toastText, setToastText] = useState("");
  const [toastClass, setToastClass] = useState("hide");
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    api.loadBlogs().then(data => {
      setBlogs(data.data);
    });
  };

  const newBlog = () => {
    let newTitle = `New Blog ${blogs.length + 1}`;
    let data = {
      username: "admin",
      title: newTitle,
      img: "",
      live: false,
      views: 0,
      category: "Reading"
    };
    api.newBlog(data).then(done => {
      if (done.data !== null || done.data !== undefined) {
        if (done.data.err === "duplicate title") {
          setToastText("That title already exists.");
          showToast();
        } else {
          setToastText(`${newTitle} was created.`);
          showToast();
          loadBlogs();
        }
      }
    });
  };

  const showToast = () => {
    setToastClass("showToast");
    setTimeout(() => {
      setToastClass("hideToast");
    }, 5000);

    setTimeout(() => {
      setToastText("");
    }, 7000);
  };

  return (
    <Layout>
      {/* toast message on error */}
      <Toast className={toastClass} text={toastText} />
      <div className="container-fluid admin">
        <AdminNav />
        <div className="container">
          <div className="columns">
            <div className="col-xl-12">
              <div className="blogs">
                <div className="blogs-header-bar">
                  <h2>Blogs</h2>
                  <span className="ml-auto">
                    <PBtn className="createNew" onClick={newBlog}>
                      <i className="fas fa-plus"></i>
                    </PBtn>
                  </span>
                </div>
              </div>
              <div className="row-contained">
                <div className="col-xl-3">
                  <p>Title</p>
                </div>
                <div className="col-xl-1">
                  <p>Date</p>
                </div>
                <div className="col-xl-1">
                  <p>Views</p>
                </div>
                <div className="col-xl-1">
                  <p>Live</p>
                </div>
                <div className="col-xl-2">
                  <p>Categories</p>
                </div>
              </div>
              {blogs.map((blog, index) => {
                return (
                  <div className="row-contained">
                    <div className="blogDisplay">
                      <div className="col-xl-3">
                        <Link href={`/admin-blog/${blog.title}`}>
                          <a>{blog.title}</a>
                        </Link>
                      </div>
                      <div className="col-xl-1">{blog.date}</div>
                      <div className="col-xl-1">{blog.views}</div>
                      <div className="col-xl-1">{blog.live.toString()}</div>
                      <div className="col-xl-2">{blog.category}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
