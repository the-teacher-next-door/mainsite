import React, { useState, useEffect } from "react";

const ShareMenu = props => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <div className="container">
      <h2>Don't Forget to Share this Post!</h2>
      <ul>
        <li>
          <iframe
            src={`https://www.facebook.com/plugins/share_button.php?href=${url}&layout=button_count&size=small&appId=878288262298017&=width=106&height=28`}
            width="106"
            height="28"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameborder="0"
            allowTransparency="true"
            allow="encrypted-media"
          ></iframe>
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default ShareMenu;
