import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import "isomorphic-fetch";
import Card from "../Components/Card";
import MiniConvert from "../Components/miniConvert";
import Footer from "../Components/Footer/FooterNext";
import Link from "next/link";
import R1 from "../images/holidays1.jpg";
import R2 from "../images/holidays2.jpg";
import R3 from "../images/holidays3.jpg";
import IconImages from "../Components/IconImages";
import Mug from "../images/Mug.png";
import PBtn from "../Components/PBtn";
import api from "../utils/api";
import Header from "../Components/Header";
const Blogs = props => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    let url = window.location.href.split("/");
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
          <div className="columns is-multiline is-centered">
            <div className="column is-6 has-text-centered">
              <h1>
                <IconImages img={Mug} /> Holidays
              </h1>
              <h2>
                Even big kids enjoy celebrating holidays and seasons! This
                section has activities, resources, and lots of mentor text
                suggestions to make holidays fun and full of learning!
              </h2>
            </div>
            <div className="column is-6 has-text-centered">
              <h1 className="secondary-title">
                Featured Resources from My Store
              </h1>
              <div className="columns is-multiline is-centered">
                <div className="column is-4 has-text-centered">
                  <Link href="https://www.teacherspayteachers.com/Product/Christmas-Around-the-World-for-Older-Kids-Holidays-Around-the-World-2192306">
                    <a>
                      <img
                        src={R1}
                        alt="Holidays\ Games: Fiction and Nonfiction Bundle"
                      />
                    </a>
                  </Link>
                </div>
                <div className="column is-4 has-text-centered">
                  <Link href="https://www.teacherspayteachers.com/Product/Earth-Day-Literacy-Set-Earth-Day-Activities-1161290">
                    <a>
                      <img
                        src={R2}
                        alt="Holidays\ Games: Fiction and Nonfiction Bundle"
                      />
                    </a>
                  </Link>
                </div>
                <div className="column is-4 has-text-centered">
                  <Link href="https://www.teacherspayteachers.com/Product/Womens-History-Literacy-Set-Womens-History-Month-1724748">
                    <a>
                      <img
                        src={R3}
                        alt="Holidays Games: Fiction and Nonfiction Bundle"
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
            <div className="has-text-centered Holidays">
              <div className="columns is-multiline is-centered">
                {blogs.map((blog, index) => {
                  if (blog.live && blog.category === "Holidays") {
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
