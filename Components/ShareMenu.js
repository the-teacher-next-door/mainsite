import React, { useState, useEffect } from "react";
import { FacebookProvider, ShareButton } from "react-facebook";

const ShareMenu = props => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <div className="container share-menu">
      <h2>
        If this post was helpful to you, I’d love for you to pin it or to share
        it with a teacher friend!
      </h2>
      <ul>
        <li>
          <a
            style={{
              padding: "10px 19px",
              borderRadius: "3px",
              color: "#fff",
              backgroundColor: "#3b5998"
            }}
            onClick={() => {
              window.open(
                `http://www.facebook.com/sharer.php?u=${url} ${props.title}`,
                "facebookShare",
                "width=626,height=436"
              );
              return false;
            }}
          >
            <i className="fab fa-facebook-square"></i> Facebook
          </a>
          {/* <iframe
            src={`https://www.facebook.com/plugins/share_button.php?href=${url}&layout=button_count&size=small&appId=1509492819325338&=width=106&height=28`}
            width="106"
            height="28"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameborder="0"
            allowTransparency="true"
            allow="encrypted-media"
          ></iframe> */}
        </li>
        <li>
          <a
            style={{
              padding: "10px 20px",
              borderRadius: "3px",
              color: "#fff",
              backgroundColor: "#E60023"
            }}
            onClick={() => {
              window.open(
                `http://pinterest.com/pin/create/button/?url=${url}&media=https://bookriot.com/wp-content/uploads/2018/11/best-thanksgiving-books-for-kids.jpg&media=${props.mainImage}&description=${props.title}`,
                "pinterestShare",
                "width=750,height=350"
              );
              return false;
            }}
          >
            <i className="fab fa-pinterest"></i> Pinterest
          </a>
        </li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default ShareMenu;
