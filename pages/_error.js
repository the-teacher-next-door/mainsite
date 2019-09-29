import React, { useEffect } from "react";

function Error({ statusCode }) {
  useEffect(() => {
    console.log(window.location.href.split("/"));

    if (window.location.href.split("/").length === 7) {
      window.location.href =
        "https://the-teacher-next-door.com/my-blog/" +
        window.location.href.split("/")[6];
    } else {
      window.location.href = "https://the-teacher-next-door.com/my-blog";
    }
  }, []);
  return (
    <p>
      {/* {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"} */}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default Error;
