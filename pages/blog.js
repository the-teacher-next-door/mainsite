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
import axios from "axios";
const BlogPage = props => {
  // const categories = props.blogs.category.split(",");
  console.log(props.secondResponse);
  return (
    <Layout>
      <Head>
        <meta property="og:type" content="blog" />
        <meta property="og:title" content={props.blogs[0].title.rendered} />
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
                  {props.blogs[0].categories.map(category => {
                    if (category === 2) {
                      return <IconImages img={Book} />;
                    }
                    if (category === 3) {
                      return <IconImages img={Pencil} />;
                    }
                    if (category === 4) {
                      return <IconImages img={Calculator} />;
                    }
                    if (category === 5) {
                      return <IconImages img={Mug} />;
                    }
                    if (category === 6) {
                      return <IconImages img={Light} />;
                    }
                  })}
                </div>
                <h1 className="blog-title">{props.blogs[0].title.rendered}</h1>
                <p>By: Jennifer Larson</p>
                <p>{props.blogs[0].date}</p>
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
                  dangerouslySetInnerHTML={{
                    __html: props.blogs[0].content.rendered
                  }}
                />
                <div className="shareMenu">
                  <ShareMenu />
                </div>
              </div>
            </div>
          </div>
          <BlogSlider blogs={props.allBlogs} />

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
  // const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
  // console.log(baseUrl);
  // const response = await fetch(
  //   "http://165.22.165.117:8000/wp-json/wp/v2/posts?slug=" + query.q
  // );
  // const secondResponse = await fetch(baseUrl + ":8000/wp-json/wp/v2/posts");
  // const rBlogs = await response.json();
  // const rAllBlogs = await secondResponse.json();
  // return { blogs: rBlogs, allBlogs: rAllBlogs };
  const response = await axios.get(
    "https://tnd-4605b0.easywp.com/wp-json/wp/v2/posts?slug=" + query.q
  );

  const secondResponse = await axios.get(
    "https://tnd-4605b0.easywp.com/wp-json/wp/v2/posts?_embed"
  );
  return {
    blogs: response.data,
    allBlogs: secondResponse.data
  };
};
export default BlogPage;
