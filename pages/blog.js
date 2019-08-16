import React, { useState, useEffect } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import PBtn from "../Components/PBtn";
import Input from "../Components/Input";
import Layout from "../Components/Layout/Layout";
import Header from "../Components/Header";
import { useRouter } from "next/router";
import "isomorphic-fetch";
import Comments from "../Components/Comments";
import FooterNext from "../Components/Footer";
import ShareMenu from "../Components/ShareMenu";
import BlogSlider from "../Components/BlogSlider";
import api from "../utils/api";
import IconImages from "../Components/IconImages";
import Book from "../images/BookIcon.png";
import Calculator from "../images/calc.png";
import Pencil from "../images/pencil.png";
import Light from "../images/light.png";
import Mug from "../images/mug.png";
const BlogPage = props => {
  const categories = props.blogs.category.split(",");
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    api.loadBlogs().then(blog => {
      setBlogs(blog.data);
    });
  }, []);
  return (
    <Layout>
      <div className="blogPage">
        <Header />
        <div className="container-fluid blog-container">
          <div className="columns is-centered">
            <div className="column is-12">
              <div className="title-container">
                <div className="categories">
                  {categories.map(category => {
                    if (category === "Reading") {
                      return <IconImages img={Book} />;
                    }
                    if (category === "Writing") {
                      return <IconImages img={Pencil} />;
                    }
                    if (category === "Math") {
                      return <IconImages img={Calculator} />;
                    }
                    if (category === "Holidays") {
                      return <IconImages img={Mug} />;
                    }
                    if (category === "Ideas") {
                      return <IconImages img={Light} />;
                    }
                  })}
                </div>
                <h1 className="blog-title">{props.blogs.title}</h1>
                <p>By: Jennifer Larson</p>
                <p>{props.blogs.date}</p>
                <ul>
                  <li>
                    {" "}
                    <PBtn
                      className="social-icons"
                      link="https://www.facebook.com/TheTeacherNextDoor"
                      external={true}
                    >
                      <i className="fab fa-facebook"></i>
                    </PBtn>{" "}
                  </li>
                  <li>
                    {" "}
                    <PBtn
                      className="social-icons"
                      link="https://www.instagram.com/theteachernextdoor/"
                      external={true}
                    >
                      <i className="fab fa-instagram"></i>
                    </PBtn>{" "}
                  </li>
                  <li>
                    {" "}
                    <PBtn
                      className="social-icons"
                      link="https://www.pinterest.com/TeacherNextDoor/"
                      external={true}
                    >
                      <i className="fab fa-pinterest-square"></i>
                    </PBtn>{" "}
                  </li>
                  <li>
                    {" "}
                    <PBtn
                      className="social-icons"
                      link="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door"
                      external={true}
                    >
                      TpT
                    </PBtn>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="preview">
          <div className="container blog-text">
            <div className="columns is-centered ">
              <div className="column is-6">
                <span dangerouslySetInnerHTML={{ __html: props.blogs.blog }} />
                <div className="shareMenu">
                  <ShareMenu />
                </div>
              </div>
            </div>
          </div>
          <BlogSlider blogs={blogs} />

          <div className="continer-fluid" id="comments">
            <Comments blogId={props.blogs._id} />
          </div>
        </div>
        <FooterNext />
      </div>
    </Layout>
  );
};

BlogPage.getInitialProps = async function({ req, query }) {
  console.log(query);
  const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
  const response = await fetch(baseUrl + "/api/blog/load/" + query.q);

  const blogs = await response.json();
  return { blogs: blogs };
};
export default BlogPage;
