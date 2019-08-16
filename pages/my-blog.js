import React, { Component } from "react";
import NavNext from "../Components/NavNext";
import IconNav from "../Components/IconNav";
import Layout from "../Components/Layout/Layout";
import "isomorphic-fetch";
import Card from "../Components/Card";
import MiniConvert from "../Components/miniConvert";
import Footer from "../Components/Footer";
import Reading from "../images/BookIcon.png";
import Writing from "../images/Pencil.png";
import Math from "../images/Calc.png";
import Holidays from "../images/Mug.png";
import Ideas from "../images/Light.png";
import Link from "next/link";
import PBtn from "../Components/PBtn";
const Blogs = props => {
  if (props.rBlogs !== undefined) {
    return (
      <Layout>
        <div className="blogs">
          <NavNext />
          <IconNav />
          <MiniConvert />
          <div className="container blog-container">
            <div className="reading">
              <div className="columns is-vcentered padding-top-30">
                <div className="column inline">
                  <img src={Reading} alt="" />
                  <h1>Reading</h1>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Minus quod ratione atqu.
                  </p>
                </div>
                <div className="column is-2">
                  <Link as={`/reading`} href="/reading?q=reading">
                    <a>
                      <PBtn>VIEW MORE</PBtn>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="columns overflow-hidden">
                {props.rBlogs.map((blog, index) => {
                  if (blog.live && blog.category === "Reading") {
                    return (
                      <div className="column is-3" key={index}>
                        <Card
                          title={blog.title}
                          img={blog.img}
                          description={blog.description}
                          category={blog.category.split(",")[0]}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="math">
              <div className="columns is-vcentered padding-top-30">
                <div className="column inline">
                  <img src={Math} alt="" />
                  <h1>Math</h1>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Minus quod ratione atqu.
                  </p>
                </div>
                <div className="column is-2">
                  <Link as={`/math`} href="/math?q=math">
                    <a>
                      <PBtn>VIEW MORE</PBtn>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="columns">
                {props.mBlogs.map((blog, index) => {
                  if (blog.live && blog.category === "Math") {
                    return (
                      <div className="column is-3" key={index}>
                        <Card
                          title={blog.title}
                          img={blog.img}
                          description={blog.description}
                          category={blog.category.split(",")[0]}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="writing">
              <div className="columns is-vcentered padding-top-30">
                <div className="column inline">
                  <img src={Writing} alt="" />
                  <h1>Writing & Grammar</h1>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Minus quod ratione atqu.
                  </p>
                </div>
                <div className="column is-2">
                  <Link as={`/writing`} href="/writing?q=writing">
                    <a>
                      <PBtn>VIEW MORE</PBtn>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="columns">
                {props.wBlogs.map((blog, index) => {
                  if (blog.live && blog.category === "Writing") {
                    return (
                      <div className="column is-3" key={index}>
                        <Card
                          title={blog.title}
                          img={blog.img}
                          description={blog.description}
                          category={blog.category.split(",")[0]}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="holidays">
              <div className="columns is-vcentered padding-top-30">
                <div className="column inline">
                  <img src={Holidays} alt="" />
                  <h1>Holidays</h1>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Minus quod ratione atqu.
                  </p>
                </div>
                <div className="column is-2">
                  <Link as={`/holidays`} href="/holidays?q=holidays">
                    <a>
                      <PBtn>VIEW MORE</PBtn>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="columns">
                {props.hBlogs.map((blog, index) => {
                  if (blog.live && blog.category === "Holidays") {
                    return (
                      <div className="column is-3" key={index}>
                        <Card
                          title={blog.title}
                          img={blog.img}
                          description={blog.description}
                          category={blog.category.split(",")[0]}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            <div className="classroom">
              <div className="columns is-vcentered padding-top-30">
                <div className="column inline">
                  <img src={Ideas} alt="" />
                  <h1>Classroom Ideas</h1>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Minus quod ratione atqu.
                  </p>
                </div>
                <div className="column is-2">
                  <Link as={`/ideas`} href="/ideas?q=ideas">
                    <a>
                      <PBtn>VIEW MORE</PBtn>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="columns">
                {props.iBlogs.map((blog, index) => {
                  if (blog.live && blog.category === "Ideas") {
                    return (
                      <div className="column is-3" key={index}>
                        <Card
                          title={blog.title}
                          img={blog.img}
                          description={blog.description}
                          category={blog.category.split(",")[0]}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="blogs">
          <NavNext />
          <IconNav />
          <MiniConvert />
          <div className="container blog-container padding-top-30">
            <div className="columns is-multiline">
              <div className="column is-12">
                <h2>Search Results</h2>
              </div>
              {props.blogs.map((blog, index) => {
                if (blog.live) {
                  return (
                    <div className="column is-3" key={index}>
                      <Card
                        title={blog.title}
                        img={blog.img}
                        description={blog.description}
                        category={blog.category.split(",")[0]}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    );
  }
};
Blogs.getInitialProps = async function({ req, query }) {
  if (Object.keys(query).length > 0) {
    const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
    const response = await fetch(baseUrl + "/api/blog/search/" + query.q);

    const blogs = await response.json();
    return { blogs: blogs };
  } else {
    const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
    // const response = await fetch(baseUrl + "/api/blog/loadall");

    const reading = await fetch(baseUrl + "/api/blog/loadFour/Reading");
    const writing = await fetch(baseUrl + "/api/blog/loadFour/Writing");
    const math = await fetch(baseUrl + "/api/blog/loadFour/Math");
    const holidays = await fetch(baseUrl + "/api/blog/loadFour/Holidays");
    const ideas = await fetch(baseUrl + "/api/blog/loadFour/Ideas");
    const rBlogs = await reading.json();
    const wBlogs = await writing.json();
    const mBlogs = await math.json();
    const hBlogs = await holidays.json();
    const iBlogs = await ideas.json();
    return { rBlogs, wBlogs, mBlogs, hBlogs, iBlogs };
  }
};
export default Blogs;
