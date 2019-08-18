import React, { useState, useEffect } from "react";
import { FacebookProvider, ShareButton } from "react-facebook";
const ShareMenu = props => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <div className="container share-menu">
      <h2>Don't Forget to Share this Post!</h2>
      <ul>
        <li>
          <iframe
            src={`https://www.facebook.com/plugins/share_button.php?href=${url}&layout=button_count&size=small&appId=1509492819325338&=width=106&height=28`}
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
