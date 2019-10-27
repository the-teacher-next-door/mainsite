import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import AdminNav from "../Components/AdminNav/AdminNav";
import api from "../utils/api";
import PBtn from "../Components/PBtn";
import Temp from "../images/tempImg.png";
import Input from "../Components/Input";
import Container from "../Components/FormatComponents/Container";
import Column from "../Components/FormatComponents/Column";
import Columns from "../Components/FormatComponents/Columns";
import ContainerFluid from "../Components/FormatComponents/ContainerFluid";
import AdminTopBar from "../Components/AdminTopBar/AdminTopBar";
const AdminSlider = () => {
  const [images, setImages] = useState([]);
  const [menuClass, setMenuClass] = useState("hide");
  useEffect(() => {
    loadImages();
  }, []);
  const newImage = async () => {
    let data = {
      title: "New Image",
      link: "https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door",
      img: ""
    };
    const res = await api.newSliderImage(data);
    console.log(`slider: ${res}`);
    loadImages();
  };

  const loadImages = () => {
    api.loadSliderImages().then(data => {
      setImages(data.data);
    });
  };

  const saveSlider = e => {
    e.preventDefault();
    console.log(e.target.dataset["id"]);
    const data = new FormData(e.target);
    let newSlide = {
      _id: e.target.dataset["id"],
      title: data.get("title"),
      link: data.get("link"),
      img: data.get("img")
    };

    api.saveSlider(newSlide);
  };
  const showMenu = () => {
    if (menuClass === "hide") {
      setMenuClass("show");
    } else {
      setMenuClass("hide");
    }
  };
  return (
    <Layout>
      <AdminTopBar showMenu={showMenu} />
      <AdminNav active="storeLinks" className={menuClass} />
      <ContainerFluid className="admin">
        <Container>
          <Columns className="is-multiline blogs-header-bar">
            <Column className="is-6 left">
              <h1>Slider</h1>
            </Column>
            <Column className="is-6 right">
              <PBtn className="createNew" onClick={newImage}>
                <i className="fas fa-plus"></i>
              </PBtn>
            </Column>
          </Columns>
          <Columns className="is-multiline">
            {images.map((image, index) => {
              return image.img === "" ? (
                <Column className="is-3">
                  <form onSubmit={saveSlider} data-id={image._id}>
                    <div className="card">
                      <div className="card-image">
                        <figure className="image">
                          <img src={Temp} alt="" />
                        </figure>
                        <div className="card-body">
                          <label>Slide Name</label>
                          <Input
                            type="text"
                            className="input"
                            defaultValue={image.title}
                            placeholder="Title"
                            name="title"
                            // onChange={handleChange}
                          />
                          <label>Slide Link</label>
                          <Input
                            className="input"
                            type="text"
                            defaultValue={image.link}
                            placeholder="Link"
                            name="link"
                            // onChange={handleChange}
                          />
                          <label>Slide Image URL</label>
                          <Input
                            className="input"
                            type="text"
                            defaultValue={image.img}
                            placeholder="Image URL"
                            name="img"
                            // onChange={handleChange}
                          />
                        </div>
                        <div className="card-footer-item">
                          <PBtn type="submit">Save</PBtn>
                        </div>
                      </div>
                    </div>
                  </form>
                </Column>
              ) : (
                <Column className="is-3">
                  <form onSubmit={saveSlider} data-id={image._id}>
                    <div className="card">
                      <div className="card-image">
                        <figure className="image">
                          <img src={image.img} alt="" />
                        </figure>
                        <div className="card-content">
                          <label>Slide Name</label>
                          <Input
                            type="text"
                            className="input"
                            defaultValue={image.title}
                            placeholder="Title"
                            name="title"
                            // onChange={handleChange}
                          />
                          <label>Slide Link</label>
                          <Input
                            type="text"
                            className="input"
                            defaultValue={image.link}
                            placeholder="Link"
                            name="link"
                            // onChange={handleChange}
                          />
                          <label>Slide Image URL</label>
                          <Input
                            type="text"
                            className="input"
                            defaultValue={image.img}
                            placeholder="Image URL"
                            name="img"
                            // onChange={handleChange}
                          />
                        </div>
                        <div className="card-footer-item">
                          <PBtn type="submit">Save</PBtn>
                        </div>
                      </div>
                    </div>
                  </form>
                </Column>
              );
            })}
          </Columns>
        </Container>
      </ContainerFluid>
    </Layout>
  );
};

export default AdminSlider;
