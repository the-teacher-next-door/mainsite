import React from "react";
import Head from "next/head";

import "../../scss/style.scss";
const Layout = props => {
  return (
    <div className="page-layout">
      <Head>
        <title>The Teacher Next Door</title>
        <link
          href="https://fonts.googleapis.com/css?family=Cabin:400,700|Lato:400,700|Roboto:400,700&display=swap"
          rel="stylesheet"
        ></link>
        <script src="https://kit.fontawesome.com/33b13ebe41.js"></script>
        <script src="//assets.pinterest.com/js/pinit.js"></script>
        <meta
          name="description"
          content="Creative Ideas and Quality Common Core Aligned Teaching Materials From My Classroom To Yours"
        />
        <meta name="author" content="Jennifer Larson" />
        <meta name="title" content="The Teacher Next Door - Creative Ideas From My Classroom To Yours"/>
        <meta name="keywords" content="Common Core, reading, Common Core standards English Language Arts, ELA, reading strategies, teaching ideas, teaching strategies, reading comprehension, theme, main idea, inferences, characters, close reading, figurative language, teachers pay teachers, test prep, classroom organization, classroom management, writing, persuasive writing, paragraph writing, compare and contrast, cause and effect, informational text structures, task cards, mentor texts, third grade, fourth grade, fifth grade, elementary education, primary education teacher blog" />
      </Head>
      {props.children}
      {/* <style jsx global>{`
        
      `}</style> */}
    </div>
  );
};

Layout.getInitialProps = async function() {};
export default Layout;
