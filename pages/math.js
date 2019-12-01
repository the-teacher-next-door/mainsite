import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import "isomorphic-fetch";
import Card from "../Components/Card";
import MiniConvert from "../Components/miniConvert";
import Footer from "../Components/Footer/FooterNext";
import Slide from "../Components/Slide";
import Link from "next/link";
import R1 from "../images/math1.jpg";
import R2 from "../images/math2.jpg";
import R3 from "../images/math3.jpg";
import IconImages from "../Components/IconImages";
import Calculator from "../images/Calc.png";
import Paper from "../images/V.png";
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
                <IconImages img={Calculator} /> Math
              </h1>
              <h2>
                This section helps you make math more meaningful for your upper
                grade students! It includes math centers for every standard, fun
                activities and resources to reinforce concepts, as well as hands
                on strategies to help your students truly understand numbers.
              </h2>
            </div>
            <div className="column is-6 has-text-centered">
              <h1 className="secondary-title">
                Featured Resources from My Store
              </h1>
              <div className="columns is-multiline is-centered">
                <div className="column is-4 has-text-centered">
                  <Link href="https://www.teacherspayteachers.com/Product/3rd-Grade-Math-Task-Cards-Mega-Bundle-3rd-Grade-Math-Centers-Bundle-2098801">
                    <a>
                      <img
                        src={R1}
                        alt="Reading Games: Fiction and Nonfiction Bundle"
                      />
                    </a>
                  </Link>
                </div>
                <div className="column is-4 has-text-centered">
                  <Link href="https://www.teacherspayteachers.com/Product/4th-Grade-Math-Task-Cards-Mega-Bundle-4th-Grade-Math-Centers-Bundle-2064414">
                    <a>
                      <img
                        src={R2}
                        alt="Reading Games: Fiction and Nonfiction Bundle"
                      />
                    </a>
                  </Link>
                </div>
                <div className="column is-4 has-text-centered">
                  <Link href="https://www.teacherspayteachers.com/Product/5th-Grade-Math-Task-Cards-Mega-Bundle-5th-Grade-Math-Centers-2042128">
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
        {/* store featured */}
        <div className="container-fluid light-gray-background blog-container">
          <div className="container">
            <div className="has-text-centered math">
              <div className="columns is-multiline is-centered">
                {blogs.map((blog, index) => {
                  if (blog.live && blog.category === "Math") {
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
