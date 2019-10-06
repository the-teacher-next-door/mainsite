import React, { useEffect } from "react";

function Error({ statusCode }) {
  useEffect(() => {
    if (window.location.href.split("/").length === 7) {
      let param = window.location.href.split("/")[6];
      
      window.location.href =
        "https://the-teacher-next-door.com/my-blog/reading/" + param;
    } else if (window.location.href.split("/").length === 6) {
      let param = window.location.href.split("/")[5];
      window.location.href =
        "https://the-teacher-next-door.com/my-blog/" + param;
    } else {
      window.location.href = "https://the-teacher-next-door.com/my-blog";
    }
  }, []);
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default Error;
