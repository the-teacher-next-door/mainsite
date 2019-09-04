import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import "isomorphic-fetch";
import Card from "../Components/Card";
import MiniConvert from "../Components/miniConvert";
import Footer from "../Components/Footer/FooterNext";
import Link from "next/link";
import R1 from "../images/classroom1.jpg";
import R2 from "../images/classroom2.jpg";
import R3 from "../images/classroom3.jpg";
import IconImages from "../Components/IconImages";
import Light from "../images/Light.png";
import PBtn from "../Components/PBtn";
import api from "../utils/api";
import Header from "../Components/Header";
const Blogs = props => {
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
        <Header />
        <MiniConvert />
        {/* Title box */}
        <div className="container titlebox">
          <div className="columns is-multiline is-centered">
            <div className="column is-6 has-text-centered">
              <h1>
                <IconImages img={Light} /> Classroom
              </h1>
              <h2>
                Besides teaching, there are so many things that teachers juggle
                during the school year…from organizing the classroom, to
                classroom management, creating a positive classroom climate, and
                more! This section has lots of practical tips, resources, and
                strategies to help new teachers as well as veteran teachers.
              </h2>
            </div>
            <div className="column is-6">
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
            <div className="has-text-centered Classroom">
              <div className="columns is-multiline is-centered">
                {blogs.map((blog, index) => {
                  if (blog.live && blog.category === "Ideas") {
                    return (
                      <div className="column is-3" key={index}>
                        <Card
                          title={blog.title}
                          img={blog.img}
                          cleanTitle={blog.cleanTitle}
                          description={blog.description}
                          category={blog.category.split(",")[0].toLowerCase()}
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
