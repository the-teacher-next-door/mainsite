import React, { Component } from "react";
import NavNext from "../NavNext";
import IconNav from "../IconNav";
import Layout from "../Layout/Layout";
import "isomorphic-fetch";
import Card from "../Card";
import MiniConvert from "../miniConvert";
import Footer from "../Footer";
import Link from "next/link";
import IconImages from "../IconImages";
import Paper from "../../images/V.png";
import PBtn from "../PBtn";
const CategoryPages = props => {
  const {
    is_category,
    summary,
    is_product_link_one,
    is_product_link_two,
    is_product_link_three,
    is_icon_image,
    is_image_one,
    is_image_two,
    is_image_three,
    is_product_title_one,
    is_product_title_two,
    is_product_title_three
  } = props;

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
                <IconImages img={is_icon_image} /> {is_category}
              </h1>
            </div>
            <div className="column is-4 has-text-centered">
              <h2>
                {summary}
                Even big kids enjoy celebrating holidays and seasons! This
                section has activities, resources, and lots of mentor text
                suggestions to make holidays fun and full of learning!
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
                <Link href={is_product_link_one}>
                  <a>
                    <img src={is_image_one} alt={is_product_title_one} />
                  </a>
                </Link>
              </div>
              <div className="column is-4 has-text-centered">
                <Link href={is_product_link_two}>
                  <a>
                    <img src={is_image_two} alt={is_product_title_two} />
                  </a>
                </Link>
              </div>
              <div className="column is-4 has-text-centered">
                <Link href={is_product_link_three}>
                  <a>
                    <img src={is_image_three} alt={is_product_title_three} />
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
          <div className={`has-text-centered ${is_category}`}>
            <IconImages img={Paper} />
            <h1 className="padding-50">"{is_category}" Blogs</h1>
            <div className="columns is-multiline is-centered">
              {props.blogs.map((blog, index) => {
                if (blog.live && blog.category === is_category) {
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
CategoryPages.getInitialProps = async function({ req, query }) {
  const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
  const response = await fetch(baseUrl + "/api/blog/search/" + query.q);

  const blogs = await response.json();
  return { blogs: blogs };
};
export default CategoryPages;
