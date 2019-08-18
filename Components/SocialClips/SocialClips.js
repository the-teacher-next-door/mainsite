import React, { Component } from "react";
import Layout from "../Layout/Layout";
import api from "../../utils/api";
class SocialClips extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "//assets.pinterest.com/js/pinit.js";
    script.async = true;

    document.body.appendChild(script);
  }
  render() {
    return (
      <>
        <div className="container-fluid social">
          <div className="container">
            <div className="columns">
              <div className="column is-4">
                <h2>Pinterest</h2>
                <a
                  data-pin-do="embedUser"
                  data-pin-board-width="375"
                  data-pin-scale-height="600"
                  data-pin-scale-width="80"
                  href="https://www.pinterest.com/TeacherNextDoor/"
                ></a>
              </div>
              <div className="column is-4">
                <h2>Facebook</h2>
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTheTeacherNextDoor%2F&tabs=timeline&width=400&height=786&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=878288262298017"
                  width="395"
                  height="710"
                  style={{
                    width: "100%",
                    border: "0",
                    overflow: "hidden",
                    height: "100%"
                  }}
                  scrolling="no"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                ></iframe>
              </div>
              <div className="column is-4">
                <h2>Instagram</h2>
                <iframe
                  src="//lightwidget.com/widgets/f1774a3b24a655c084ebfe1ac596c67d.html"
                  scrolling="no"
                  allowtransparency="true"
                  class="lightwidget-widget"
                  style="width:100%;border:0;overflow:hidden;"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default SocialClips;

//access token AgmenqdC86FIzpmol42XLIUgwRuvFbvZhm6-MqlGFc3CdWDLDwWKwDAAADV4RhXQBhAAuCYAAAAA
