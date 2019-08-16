import React from "react";
const SocialClips = props => {
  return (
    <div className="container-fluid social">
      <div className="container">
        <div className="columns">
          <div className="column is-4">
            <h2>Pinterest</h2>
            <a
              data-pin-do="embedBoard"
              data-pin-board-width="300"
              data-pin-scale-height="500"
              data-pin-scale-width="115"
              href="https://www.pinterest.com/TeacherNextDoor/the-teacher-next-doors-blog-posts/"
            ></a>
          </div>
          <div className="column is-4">
            <h2>Facebook</h2>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTheTeacherNextDoor%2F&tabs=timeline&width=320&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=878288262298017"
              width="320"
              height="500"
              style={{ width: "100%", border: "0", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          </div>
          <div className="column is-4">
            <h2>Instagram</h2>
            <iframe
              src="//lightwidget.com/widgets/ea1e46164c8058c9bdca119a327a1ce4.html"
              scrolling="no"
              allowtransparency="true"
              class="lightwidget-widget"
              style={{ width: "100%", border: "0", overflow: "hidden" }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialClips;
