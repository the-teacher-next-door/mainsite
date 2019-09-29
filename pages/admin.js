import React, { useState, useEffect } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import PBtn from "../Components/PBtn";
import Link from "next/link";
import api from "../utils/api";
import Layout from "../Components/Layout/Layout";
import Toast from "../Components/toast";
import Container from "../Components/FormatComponents/Container";
import Columns from "../Components/FormatComponents/Columns";
import Column from "../Components/FormatComponents/Column";
import AdminTopBar from "../Components/AdminTopBar/AdminTopBar";
import ContainerFluid from "../Components/FormatComponents/ContainerFluid";
import AdminCard from "../Components/AdminCard/AdminCard";
const Admin = props => {
  const [numberOfBlogs, setNumberOfBlogs] = useState(0);
  const [numberOfImages, setNumberOfImages] = useState(0);
  const [numberOfUnreadComments, setNumberOfUnreadComments] = useState(0);
  const [unreadComments, setUnreadComments] = useState([]);
  const [menuClass, setMenuClass] = useState("hide");
  useEffect(() => {
    getNumberOfBlogs();

    getNumberOfImages();
    getNumberOfUnreadComments();
  }, []);

  const getNumberOfBlogs = async () => {
    const blogs = await api.loadBlogs();

    setNumberOfBlogs(blogs.data.length);
  };

  const getNumberOfImages = async () => {
    const images = await api.loadImages();

    setNumberOfImages(images.data.length);
  };

  const getNumberOfUnreadComments = async () => {
    const comments = await api.loadUnread();

    setNumberOfUnreadComments(comments.data.length);

    comments.data.forEach(comment => {
      api.loadBlogAdmin(comment.blogId).then(blog => {
        let commentObj = {
          blogTitle: blog.data.title,
          name: comment.name,
          date: comment.date,
          comment: comment.comment
        };

        setUnreadComments(x => x.concat(commentObj));
      });
    });
  };

  const goToBlogFromComment = () => {};

  const deleteComment = async e => {
    console.log(e.target.dataset.data);
    const deleted = await api.deleteComments(e.target.dataset.data);
    console.log(deleted);

    getNumberOfUnreadComments();
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
      <AdminNav active="dashboard" className={menuClass} />
      <ContainerFluid className="admin">
        <Container>
          <Columns>
            <Column className="is-4">
              <AdminCard
                data={numberOfBlogs}
                smallText="Total Number of Blogs"
              />
            </Column>
            <Column className="is-4">
              <AdminCard
                data={numberOfImages}
                smallText="Total Number of Images"
              />
            </Column>
            <Column className="is-4">
              <AdminCard
                data={numberOfUnreadComments}
                smallText="Total Number of Unread Comments"
              />
            </Column>
          </Columns>
        </Container>
        <Container>
          <Column className="is-12">
            <h2>Unread Comments</h2>
          </Column>
        </Container>
        <Container>
          <Column className="is-12">
            {unreadComments.map(comments => {
              console.log(comments.blogId);
              let today = new Date(parseInt(comments.date));
              var dd = today.getDate();

              var mm = today.getMonth() + 1;
              var yyyy = today.getFullYear();
              if (dd < 10) {
                dd = "0" + dd;
              }
              if (mm < 10) {
                mm = "0" + mm;
              }
              today = mm + "/" + dd + "/" + yyyy;

              //get blog title
              return (
                <div className="unreadComments">
                  <h2>{comments.name}</h2>
                  <p>{comments.comment}</p>
                  <p>{today}</p>
                  <p>{comments.blogTitle}</p>
                  <PBtn data={comments.blogId} onClick={deleteComment}>
                    Delete Comment
                  </PBtn>
                </div>
              );
            })}
          </Column>
        </Container>
      </ContainerFluid>
    </Layout>
  );
};

export default Admin;
