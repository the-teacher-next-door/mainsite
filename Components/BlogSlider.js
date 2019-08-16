import React from "react";
import Link from "next/link";
import Layout from "./Layout/Layout";
import Slide from "./Slide";
import PBtn from "./PBtn";
import IconImage from "./IconImages";
import Paper from "../images/V.png";
import Card from "./Card";
const BlogSlider = props => (
  <Layout>
    <div className="container-fluid padding-30 light-purple blog-slider">
      <div className="container white-bg padding-30">
        <IconImage img={Paper} />
        <h1 className="padding-bottom-30">Recent Blogs</h1>
        <div className="columns is-multiline is-centered">
          {props.blogs.map((blog, index) => {
            if (blog.live && index < 8) {
              let cleanTitle = blog.title.replace(" ", "-");
              console.log(cleanTitle);
              return (
                <div className="column is-3" key={index}>
                  <Link
                    as={`/blog/${cleanTitle}`}
                    href={`/blog?q=${blog.title}`}
                  >
                    <a>
                      <Card
                        title={blog.title}
                        img={blog.img}
                        category={blog.category}
                        description={blog.description}
                      />
                    </a>
                  </Link>
                </div>
              );
            }
          })}
        </div>
        <div className="container-fluid">
          <div className="columns is-centered">
            <div className="column is-2">
              <PBtn className="margin-top-30">Read More</PBtn>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{``}</style>
    </div>
  </Layout>
);

export default BlogSlider;
