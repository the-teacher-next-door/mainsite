import React, { useEffect } from "react";

function Error({ statusCode }) {
  useEffect(() => {
    if (window.location.href.split("/").length === 7) {
      let param = window.location.href[6].replace(/[0-9]/g, "");
      console.log(param);
      window.location.href =
        "https://the-teacher-next-door.com/my-blog/" + param;
    } else if (window.location.href.split("/").length === 6) {
      let param = window.location.href[5].replace(/[0-9]/g, "");
      window.location.href =
        "https://the-teacher-next-door.com/my-blog/" + param;
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
