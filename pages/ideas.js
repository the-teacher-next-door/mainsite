import React, { Component } from "react";
import NavNext from "../Components/NavNext";
import IconNav from "../Components/IconNav";
import Layout from "../Components/Layout/Layout";
import "isomorphic-fetch";
import Card from "../Components/Card";
import MiniConvert from "../Components/miniConvert";
import Footer from "../Components/Footer";
import Slide from "../Components/Slide";
import Link from "next/link";
import R1 from "../images/classroom1.jpg";
import R2 from "../images/classroom2.jpg";
import R3 from "../images/classroom3.jpg";
import IconImages from "../Components/IconImages";
import Light from "../images/light.png";
import Paper from "../images/V.png";
import PBtn from "../Components/PBtn";
const Blogs = props => {
  return (
    <Layout>
      <div className="categoryPages">
        <NavNext />
        <IconNav />
        <MiniConvert />
        {/* Title box */}
        <div className="container-fluid titlebox">
          <div className="columns is-multiline is-centered">
            <div className="column is-12 has-text-centered">
              <h1>
                <IconImages img={Light} /> Classroom
              </h1>
            </div>
            <div className="column is-4 has-text-centered">
              <h2>
                Besides teaching, there are so many things that teachers juggle
                during the school year…from organizing the classroom, to
                classroom management, creating a positive classroom climate, and
                more! This section has lots of practical tips, resources, and
                strategies to help new teachers as well as veteran teachers.
              </h2>
            </div>
          </div>
        </div>
        {/* store featured */}
        <div className="container-fluid featured light-purple">
          <div className="container white-bg has-text-centered">
            <h2 className="secondary-title">
              Featured Resources from My Store
            </h2>
            <div className="columns is-multiline is-centered">
              <div className="column is-4 has-text-centered">
                <Link href="https://www.teacherspayteachers.com/Product/Entire-Year-Character-Education-Bundle-Character-Education-1936539">
                  <a>
                    <img
                      src={R1}
                      alt="Classroom Games: Fiction and Nonfiction Bundle"
                    />
                  </a>
                </Link>
              </div>
              <div className="column is-4 has-text-centered">
                <Link href="https://www.teacherspayteachers.com/Product/Brain-Breaks-Brain-Break-Activity-Cards-1107780">
                  <a>
                    <img
                      src={R2}
                      alt="Classroom Games: Fiction and Nonfiction Bundle"
                    />
                  </a>
                </Link>
              </div>
              <div className="column is-4 has-text-centered">
                <Link href="https://www.teacherspayteachers.com/Product/Modern-Black-and-White-Classroom-Decor-4498083">
                  <a>
                    <img
                      src={R3}
                      alt="Classroom Games: Fiction and Nonfiction Bundle"
                    />
                  </a>
                </Link>
              </div>
              <div className="column is-2 has-text-centered button-column">
                <PBtn
                  link="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door"
                  external={true}
                  className="external"
                >
                  Visit My Shop
                </PBtn>
              </div>
            </div>
          </div>
        </div>
        <div className="container blog-container">
          <div className="has-text-centered Classroom">
            <IconImages img={Paper} />
            <h1 className="padding-50">"Classroom" Blogs</h1>
            <div className="columns is-multiline is-centered">
              {props.blogs.map((blog, index) => {
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
};
Blogs.getInitialProps = async function({ req, query }) {
  const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
  const response = await fetch(baseUrl + "/api/blog/search/" + query.q);

  const blogs = await response.json();
  return { blogs: blogs };
};
export default Blogs;
