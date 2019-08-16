import React, { useState, useEffect } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import api from "../utils/api";
import FreebiesUpload from "../Components/FreebiesUpload";
import PBtn from "../Components/PBtn";
import Layout from "../Components/Layout/Layout";
import Input from "../Components/Input";
import Link from "next/link";
import Temp from "../images/tempImg.png";
const Images = props => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadFreebies();
  }, []);

  const loadFreebies = () => {
    api.loadFreebies().then(data => {
      console.log("run");
      setImages(data.data);
      console.log(data.data);
    });
  };

  const deleteFreebie = e => {
    let data = {
      path: e.target.dataset.path
    };
    api.deleteFreebies(data).then(done => {
      console.log(done);
      api.loadFreebies().then(data => {
        setImages(data.data);
      });
    });
  };
  const saveFreebie = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    let newSlide = {
      _id: e.target.dataset["id"],
      img: data.get("img")
    };

    api.saveFreebie(newSlide).then(done => {
      loadFreebies();
    });
  };
  return (
    <Layout>
      <div className="container-fluid admin">
        <AdminNav />
        <FreebiesUpload loadImages={loadFreebies} />
        <div className="container">
          <div className="row-contained">
            <div className="col-xl-12">
              <div className="blogs">
                <div className="blogs-header-bar">
                  <h2>Freebies</h2>
                  <span className="ml-auto"></span>
                </div>
              </div>

              <div className="columns is-multiline">
                {images.map((image, index) => {
                  return image.img === "" ? (
                    <div className="column is-3">
                      <form
                        data-path={image.path}
                        data-id={image._id}
                        onSubmit={saveFreebie}
                      >
                        <div className="image">
                          <img src={Temp} alt="" />
                          <p>{image.originalname}</p>
                        </div>
                        <Input
                          defaultValue={image.img}
                          placeholder="Image URL"
                          name="img"
                        />
                        <Link href={image.path}>
                          <a>Download</a>
                        </Link>
                        <button
                          type="button"
                          data-path={image.path}
                          onClick={deleteFreebie}
                        >
                          <i class="far fa-trash-alt"></i>
                        </button>
                        <PBtn type="submit">Save</PBtn>
                      </form>
                    </div>
                  ) : (
                    <div className="column is-3">
                      <form
                        data-path={image.path}
                        data-id={image._id}
                        onSubmit={saveFreebie}
                      >
                        <div className="image">
                          <img src={image.img} alt="" />
                          <p>{image.originalname}</p>
                        </div>
                        <Input
                          defaultValue={image.img}
                          placeholder="Image URL"
                          name="img"
                        />
                        <Link href={image.path}>
                          <a>Download</a>
                        </Link>
                        <button
                          type="button"
                          data-path={image.path}
                          onClick={deleteFreebie}
                        >
                          <i class="far fa-trash-alt"></i>
                        </button>
                        <PBtn type="submit">Save</PBtn>
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
