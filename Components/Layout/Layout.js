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
      </Head>
      {props.children}
      {/* <style jsx global>{`
        
      `}</style> */}
    </div>
  );
};

Layout.getInitialProps = async function() {};
export default Layout;
