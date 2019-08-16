import React from "react";
import Head from "next/head";

import "../../scss/style.scss";
import MobileNav from "../mobileNav";
import TabletNav from "../TabletNav";
const Layout = props => {
  return (
    <div className="page-layout">
      <Head>
        <title>My styled page</title>
        <link
          href="https://fonts.googleapis.com/css?family=Cabin:400,700|Lato:400,700|Roboto:400,700&display=swap"
          rel="stylesheet"
        ></link>
        <script src="https://kit.fontawesome.com/33b13ebe41.js"></script>
        <script async defer src="//assets.pinterest.com/js/pinit.js"></script>
      </Head>
      <MobileNav />
      <TabletNav />
      {props.children}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
        }

        .container,
        .container-fluid,
        .row {
          padding: 0;
        }

        .row {
          justify-content: center;
        }

        .row-contained {
          width: 100%;
          max-width: 1140px;
          display: flex;
          flex-wrap: wrap;
          margin: 0 auto;
          justify-content: center;
        }

        .center {
          justify-content: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        a {
          color: #000000;
        }

        .border-bottom {
          border-bottom: 1px solid #80808047 !important;
        }

        ul {
          list-style-type: none;
        }

        .padding-30 {
          padding: 30px;
        }

        .padding-top-30 {
          padding-top: 30px;
        }

        .padding-10 {
          padding: 10px;
        }

        .card-shadow {
          background-color: #ffffff;
          border-radius: 4px;
          box-shadow: 0 20px 40px #a06cd5a6;
          padding: 30px;
        }
      `}</style>
    </div>
  );
};

Layout.getInitialProps = async function() {};
export default Layout;
