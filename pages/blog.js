import React, { useState, useEffect } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import PBtn from "../Components/PBtn";
import Input from "../Components/Input";
import Layout from "../Components/Layout/Layout";
import Header from "../Components/Header";
import { useRouter } from "next/router";
import "isomorphic-fetch";
import Comments from "../Components/Comments";
import Footer from "../Components/Footer/FooterNext";
import ShareMenu from "../Components/ShareMenu";
import BlogSlider from "../Components/BlogSlider";
import api from "../utils/api";
import IconImages from "../Components/IconImages";
import Book from "../images/BookIcon.png";
import Calculator from "../images/Calc.png";
import Pencil from "../images/Pencil.png";
import Light from "../images/Light.png";
import Mug from "../images/Mug.png";
import Head from "next/head";
const BlogPage = props => {
  const categories = props.blogs.category.split(",");
  const [blogs, setBlogs] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    api.loadBlogs().then(blog => {
      const sortedBlogs = blog.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setBlogs(sortedBlogs);
      // setTimeout(() => {
      //   if (document.getElementById("blogText")) {
      //     addPinItButtonToImages();
      //   }
      // }, 4000);
    });
  }, []);

  useEffect(() => {
    const sortedBlogs = blogs.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    console.log(sortedBlogs);
    setBlogs(sortedBlogs);
  }, [blogs]);

  const addPinItButtonToImages = () => {
    let parent = document.getElementById("blogText");
    let el = parent.querySelectorAll("img");
    let pinB = document.createElement("a");

    pinB.href = "pinterest.com";
    pinB.className = "small-pin";
    pinB.innerHTML = '<i class="fab fa-pinterest-square"></i>';

    for (let i = 0; i < el.length; i++) {
      let div = document.createElement("div");
      div.appendChild(el[i]);
      div.appendChild(pinB);
      el[0].parentNode.insertBefore(div, el[0]);
    }
  };
  return (
    <Layout>
      <Head>
        <title>props.blogs.title</title>
        <meta property="og:type" content="blog" />
        <meta property="og:title" content={props.blogs.title} />
        <meta property="og:description" content={props.blogs.description} />
        <meta
          property="og:url"
          content={`the-teacher-next-door.com/blog/${props.blogs.cleanTitle}`}
        />
        <meta property="og:site_name" content="the-teacher-next-door.com" />
        <meta property="article:published_time" content={props.blogs.date} />
        <meta property="article:author" content="Jennifer Larson" />
      </Head>
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
              <div className="column is-8">
                <span
                  id="blogText"
                  className="wrapper-span"
                  dangerouslySetInnerHTML={{ __html: props.blogs.blog }}
                />
                <div className="shareMenu">
                  <ShareMenu
                    title={props.blogs.title}
                    mainImage={props.blogs.img}
                  />
                </div>
              </div>
            </div>
          </div>
          <BlogSlider blogs={blogs} />

          <div className="continer-fluid" id="comments">
            <Comments blogId={props.blogs._id} />
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

BlogPage.getInitialProps = async function({ req, query }) {
  const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
  const response = await fetch(baseUrl + "/api/blog/load/" + query.q);

  const blogs = await response.json();
  return { blogs: blogs };
};
export default BlogPage;
