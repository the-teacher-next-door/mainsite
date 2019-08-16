import React, { Component } from "react";
import Jumbotron from "../Components/Jumbotron/Jumbotron";
import Link from "next/link";
import dynamic from "next/dynamic";
import Slider from "../images/freebies-slider.jpg";
import ConvertKit from "../Components/ConvertKit";
import CollectionSlider from "../Components/CollectionSlider";
import BlogSlider from "../Components/BlogSlider";
import api from "../utils/api";
// import SocialClips from "../Components/SocialClips/SocialClips";
import AboutSection from "../Components/AboutSection";
import Layout from "../Components/Layout/Layout";
import FooterNext from "../Components/FooterNext";
import "isomorphic-fetch";
import Header from "../Components/Header";
import Head from "next/head";
const SocialClips = dynamic(() =>
  import("../Components/SocialClips/SocialClips")
);

class Home extends Component {
  state = {
    blogs: [],
    items: []
  };

  componentDidMount() {
    api.loadBlogs().then(blogs => {
      console.log(blogs);
      this.setState({
        blogs: blogs.data
      });
    });
    api.loadSliderImages().then(slider => {
      this.setState({
        items: slider.data
      });
    });
  }
  render() {
    return (
      <Layout>
        <Head>
          <script async defer src="//assets.pinterest.com/js/pinit.js"></script>
          <script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></script>
        </Head>
        <div className="wrapper-home">
          <Header />
          <Jumbotron mainImage={Slider} />
          <ConvertKit title="JOIN MY NEWSLETTER!" />
          <CollectionSlider items={this.state.items} />
          <BlogSlider blogs={this.state.blogs} />
          <SocialClips />
          <AboutSection />
          <FooterNext />
        </div>
        <style jsx>{`
          .wrapper-home {
            text-align: center;
          }

          .wrapper-home .navbar {
            background-color: #695395;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Home;
