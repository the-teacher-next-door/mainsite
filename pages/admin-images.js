import React, { useState, useEffect } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import api from "../utils/api";
import Upload from "../Components/Upload";
import PBtn from "../Components/PBtn";
import Layout from "../Components/Layout/Layout";
const Images = props => {
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState("");
  useEffect(() => {
    loadImages();
    setUrl(window.location.href.split("/")[0]);
  }, []);

  const loadImages = () => {
    api.loadImages().then(data => {
      console.log("run");
      setImages(data.data);
      console.log(data.data);
    });
  };

  const deleteSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    let data = {
      path: e.target.dataset.path
    };
    api.deleteImage(data).then(done => {
      console.log(done);
      api.loadImages().then(data => {
        setImages(data.data);
      });
    });
  };

  return (
    <Layout>
      <div className="container-fluid admin">
        <AdminNav />
        <Upload loadImages={loadImages} />
        <div className="container">
          <div className="row-contained">
            <div className="col-xl-12">
              <div className="blogs">
                <div className="blogs-header-bar">
                  <h2>Images</h2>
                  <span className="ml-auto">
                    {/* <PBtn className="createNew" onClick={newBlog}>
                    <i className="fas fa-plus"></i>
                  </PBtn> */}
                  </span>
                </div>
              </div>

              <div className="columns is-multiline">
                {images.map((image, index) => {
                  return (
                    <div className="column is-3">
                      <form data-path={image.path} onSubmit={deleteSubmit}>
                        <div className="image">
                          <img src={`${url}/${image.path}`} alt="" />
                          <p>{image.originalname}</p>
                        </div>
                        <PBtn type="submit">
                          <i class="far fa-trash-alt"></i>
                        </PBtn>
                      </form>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Images;
