import React, { useState, useEffect } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import PBtn from "../Components/PBtn";
import Link from "next/link";
import api from "../utils/api";
import Layout from "../Components/Layout/Layout";
import Toast from "../Components/toast";
import ContainerFluid from "../Components/FormatComponents/ContainerFluid";
import Columns from "../Components/FormatComponents/Columns";
import Column from "../Components/FormatComponents/Column";
import Container from "../Components/FormatComponents/Container";
import AdminTopBar from "../Components/AdminTopBar/AdminTopBar";
const Admin = props => {
  const [blogs, setBlogs] = useState([]);
  const [toastText, setToastText] = useState("");
  const [toastClass, setToastClass] = useState("hide");
  const [menuClass, setMenuClass] = useState("hide");
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

  useEffect(() => {
    const sortedBlogs = blogs.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    console.log(sortedBlogs);
    setBlogs(sortedBlogs);
  }, [blogs]);

  const showToast = () => {
    setToastClass("showToast");
    setTimeout(() => {
      setToastClass("hideToast");
    }, 5000);

    setTimeout(() => {
      setToastText("");
    }, 7000);
  };
  const showMenu = () => {
    if (menuClass === "hide") {
      setMenuClass("show");
    } else {
      setMenuClass("hide");
    }
  };

  return (
    <Layout>
      <AdminTopBar showMenu={showMenu} />
      <AdminNav active="blogs" className={menuClass} />
      <ContainerFluid className="admin">
        <Container>
          <Columns className="blogs-header-bar">
            <Column className="is-6 left">
              <h1>Blogs</h1>
            </Column>
            <Column className="is-6 right">
              <PBtn className="createNew" onClick={newBlog}>
                <i className="fas fa-plus"></i>
              </PBtn>
            </Column>
          </Columns>
          <Columns className="is-multiline">
            {blogs.map((blog, index) => {
              return (
                <Column className="is-3">
                  <Link href={`/admin-blog/${blog._id}`}>
                    <a>
                      <div className="card">
                        <div className="card-image">
                          <figure className="image">
                            <img src={blog.img} alt={blog.title} />
                          </figure>
                          <p style={{ padding: "30px" }}>{blog.title}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </Column>
              );
            })}
          </Columns>
        </Container>
      </ContainerFluid>
    </Layout>
  );
};

export default Admin;
