import React, { useState, useEffect } from "react";
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
import FooterNext from "../Components/Footer/FooterNext";
import "isomorphic-fetch";
import Header from "../Components/Header";
import Head from "next/head";
import SocialClips from "../Components/SocialClips/SocialClips";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.loadBlogs().then(blogs => {
      console.log(blogs.data);
      setBlogs(blogs.data);
    });

    api.loadSliderImages().then(items => {
      setItems(items.data);
    });
  }, []);

  return (
    <Layout>
      <Head>
        <script async defer src="//assets.pinterest.com/js/pinit.js"></script>
        <script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></script>
      </Head>
      <div className="wrapper-home">
        <Header />
        <Jumbotron
          mainImage={Slider}
          h1="Find Helpful Ideas and Freebies For the Busy Teacher"
        />
        <ConvertKit title="JOIN MY NEWSLETTER!" />
        <CollectionSlider items={items} />
        <BlogSlider blogs={blogs} />
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
};
export default Home;
