import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import "isomorphic-fetch";
import Card from "../Components/Card";
import MiniConvert from "../Components/miniConvert";
import Footer from "../Components/Footer/FooterNext";
import Link from "next/link";
import R1 from "../images/writing1.jpg";
import R2 from "../images/writing2.jpg";
import R3 from "../images/writing3.jpg";
import IconImages from "../Components/IconImages";
import Pencil from "../images/Pencil.png";
import PBtn from "../Components/PBtn";
import api from "../utils/api";
import Header from "../Components/Header";
const Writing = props => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    let url = window.location.href.split("/");
    console.log(url[3]);
    api.search(url[3]).then(data => {
      setBlogs(data.data);
    });
  }, []);
  return (
    <Layout>
      <div className="categoryPages">
        <Header/>
        <MiniConvert />
        {/* Title box */}
        <div className="container titlebox">
          <div className="columns is-multiline ">
            <div className="column is-6">
              <h1>
                <IconImages img={Pencil} /> Writing & Grammar
              </h1>
              <h2>
                I love to directly teach writing to help even the most reluctant
                writers find success! This section is full of ideas, resources,
                and strategies to help your students become confident writers.
                It also includes tips to make grammar fun!
              </h2>
            </div>

            <div className="column is-6 has-text-centered">
              <h1 className="secondary-title">
                Featured Resources from My Store
              </h1>
              <div className="columns is-multiline is-centered">
                <div className="column is-4 has-text-centered">
                  <Link href="https://www.teacherspayteachers.com/Product/4th-Grade-Grammar-Games-Bundle-4th-Grade-Grammar-Centers-4058109">
                    <a>
                      <img
                        src={R1}
                        alt="Writing Games: Fiction and Nonfiction Bundle"
                      />
                    </a>
                  </Link>
                </div>
                <div className="column is-4 has-text-centered">
                  <Link href="https://www.teacherspayteachers.com/Product/5th-Grade-Grammar-Games-Bundle-5th-Grade-Grammar-Centers-4197404">
                    <a>
                      <img
                        src={R2}
                        alt="Writing Games: Fiction and Nonfiction Bundle"
                      />
                    </a>
                  </Link>
                </div>
                <div className="column is-4 has-text-centered">
                  <Link href="https://www.teacherspayteachers.com/Product/Complete-Paragraph-Writing-Bundle-for-3rd-6th-Grade-862543">
                    <a>
                      <img
                        src={R3}
                        alt="Writing Games: Fiction and Nonfiction Bundle"
                      />
                    </a>
                  </Link>
                </div>
                <div className="column has-text-centered button-column">
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
        </div>
        {/* store featured */}
        <div className="container-fluid blog-container light-gray-background">
          <div className="container">
            <div className="has-text-centered reading">
              <div className="columns is-multiline is-centered">
                {blogs.map((blog, index) => {
                  if (blog.live && blog.category === "Writing") {
                    return (
                      <div className="column is-3" key={index}>
                        <Card
                          title={blog.title}
                          cleanTitle={blog.cleanTitle}
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
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Writing;
