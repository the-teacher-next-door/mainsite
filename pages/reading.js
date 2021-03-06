import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import "isomorphic-fetch";
import Card from "../Components/Card";
import MiniConvert from "../Components/miniConvert";
import Footer from "../Components/Footer/FooterNext";
import Link from "next/link";
import R1 from "../images/reading1.jpg";
import R2 from "../images/reading2.jpg";
import R3 from "../images/reading3.jpg";
import IconImages from "../Components/IconImages";
import Book from "../images/BookIcon.png";
import PBtn from "../Components/PBtn";
import api from "../utils/api";
import Header from "../Components/Header";
const Blogs = props => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    let url = window.location.href.split("/");
    api.search(url[3]).then(data => {
      const sortedBlogs = data.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setBlogs(sortedBlogs);
    });
  }, []);

  return (
    <Layout>
      <div className="categoryPages">
        <Header />
        <MiniConvert />
        {/* Title box */}
        <div className="container titlebox">
          <div className="columns is-multiline ">
            <div className="column is-6 has-text-centered">
              <h1>
                <IconImages img={Book} /> Reading
              </h1>
              <h2>
                Reading is one of my favorite things to teach, but it can be
                challenging! In this section, you’ll find tips and resources for
                key reading comprehension strategies, how to implement effective
                reading centers, and lots of mentor text ideas to enhance your
                reading instruction.
              </h2>
            </div>

            <div className="column is-6 has-text-centered">
              <h1 className="secondary-title">
                Featured Resources from My Store
              </h1>
              <div className="container white-bg has-text-centered">
                <div className="columns is-multiline is-centered">
                  <div className="column is-4 has-text-centered">
                    <Link href="https://www.teacherspayteachers.com/Product/4th-Grade-Digital-Reading-Bundle-Fiction-for-Google-Slides-4926686">
                      <a>
                        <img
                          src="https://ecdn.teacherspayteachers.com/thumbitem/4th-Grade-Digital-Reading-Bundle-Fiction-for-Google-Slides-Bundle-Bundle-4926686-1570572238/original-4926686-1.jpg"
                          alt="4th Grade Digital Reading Bundle: Fiction for Google Slides"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="column is-4 has-text-centered">
                    <Link href="https://www.teacherspayteachers.com/Product/Reading-Games-Fiction-and-Nonfiction-Bundle-Reading-Centers-for-3rd-Grade-3797001">
                      <a>
                        <img
                          src={R2}
                          alt="Reading Games: Fiction and Nonfiction Bundle"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="column is-4 has-text-centered">
                    <Link href="https://www.teacherspayteachers.com/Product/Reading-Games-Fiction-and-Nonfiction-Bundle-Reading-Centers-for-3rd-Grade-3797001">
                      <a>
                        <img
                          src={R3}
                          alt="Reading Games: Fiction and Nonfiction Bundle"
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
        </div>
        {/* store featured */}
        <div className="container-fluid blog-container light-gray-background">
          <div className="container">
            <div className="has-text-centered reading">
              <div className="columns is-multiline is-centered">
                {blogs.map((blog, index) => {
                  if (blog.live && blog.category === "Reading") {
                    return (
                      <div className="column is-3" key={index}>
                        <Card
                          title={blog.title}
                          img={blog.img}
                          cleanTitle={blog.cleanTitle}
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

export default Blogs;
