import React from "react";
import Link from "next/link";
import Layout from "./Layout/Layout";
import Slide from "./Slide";
import PBtn from "./PBtn";
import IconImage from "./IconImages";
import Paper from "../images/V.png";
import Card from "./Card";
import TitleComponent from "./TitleComponent";
import ContainerFluid from "./FormatComponents/ContainerFluid";
import Container from "./FormatComponents/Container";
import Columns from "./FormatComponents/Columns";
import Column from "./FormatComponents/Column";
const BlogSlider = props => (
  <Layout>
    <ContainerFluid className="light-gray-background blog-slider">
      <Container>
        <TitleComponent img={Paper} h1="Recent Blogs" />
        <Columns className="is-multiline is-centerd">
          {props.blogs.map((blog, index) => {
            if (blog.live && index < 8) {
              let cleanTitle = blog.title.replace(" ", "-");
              console.log(cleanTitle);
              return (
                <Column className="is-3" key={index}>
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
                </Column>
              );
            }
          })}
        </Columns>
        <ContainerFluid>
          <Columns className="is-centered">
            <Column className="is-2">
              <Link href="/my-blog">
                <a className="margin-top-30"><PBtn>Read More</PBtn></a>
              </Link>
            </Column>
          </Columns>
        </ContainerFluid>
      </Container>
    </ContainerFluid>
  </Layout>
);

export default BlogSlider;
