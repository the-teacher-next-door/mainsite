import React, { useState, useEffect } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import api from "../utils/api";
import Upload from "../Components/Upload";
import PBtn from "../Components/PBtn";
import Layout from "../Components/Layout/Layout";
import ContainerFluid from "../Components/FormatComponents/ContainerFluid";
import Columns from "../Components/FormatComponents/Columns";
import Column from "../Components/FormatComponents/Column";
import AdminTopBar from "../Components/AdminTopBar/AdminTopBar";
import Container from "../Components/FormatComponents/Container";
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
      <AdminTopBar />
      <AdminNav active="images" />
      <ContainerFluid className="admin">
        <Container>
          <Columns className="blogs-header-bar">
            <Column className="is-6 left">
              <h1>Images</h1>
            </Column>
            <Column className="is-6 right">
              <Upload loadImages={loadImages} />
            </Column>
          </Columns>

          <div className="columns is-multiline">
            {images.map((image, index) => {
              return (
                <div className="column is-3">
                  <form data-path={image.path} onSubmit={deleteSubmit}>
                    <div className="card">
                      <div className="card-image">
                        <figure className="image">
                          <img
                            style={{ maxWidth: "40px", maxHeight: "40px" }}
                            src={`${url}/${image.path}`}
                            alt=""
                          />
                        </figure>
                        <div className="card-footer-item"></div>
                      </div>
                      <div className="card-footer-item">
                        <PBtn type="submit">
                          <i class="far fa-trash-alt"></i>
                        </PBtn>
                      </div>
                    </div>
                  </form>
                </div>
              );
            })}
          </div>
        </Container>
      </ContainerFluid>
    </Layout>
  );
};

export default Images;
