import React, { useState, useEffect } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import api from "../utils/api";
import FreebiesUpload from "../Components/FreebiesUpload";
import PBtn from "../Components/PBtn";
import Layout from "../Components/Layout/Layout";
import Input from "../Components/Input";
import Link from "next/link";
import Temp from "../images/tempImg.png";
import ContainerFluid from "../Components/FormatComponents/ContainerFluid";
import Container from "../Components/FormatComponents/Container";
import Columns from "../Components/FormatComponents/Columns";
import Column from "../Components/FormatComponents/Column";
import AdminTopBar from "../Components/AdminTopBar/AdminTopBar";
const Books = props => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    api.loadBooks().then(data => {
      setBooks(data.data);
    });
  };

  const deleteBook = e => {
    let data = {
      id: e.target.dataset.data
    };
    api.deleteBook(data).then(done => {
      api.loadBooks().then(data => {
        setBooks(data.data);
      });
    });
  };
  const newBook = () => {
    api.newBook().then(done => {
      loadBooks();
    });
  };
  const saveBook = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    let newSlide = {
      _id: e.target.dataset["id"],
      img: data.get("img"),
      link: data.get("link"),
      name: data.get("name")
    };

    api.saveBooks(newSlide).then(done => {
      loadBooks();
    });
  };
  return (
    <Layout>
      <AdminTopBar />
      <AdminNav active="storeLinks" />
      <ContainerFluid className="admin">
        <Container>
          <Columns className="is-multiline blogs-header-bar">
            <Column className="is-6 left">
              <h1>Books</h1>
            </Column>
            <Column className="is-6 right">
              <PBtn className="createNew" onClick={newBook}>
                <i className="fas fa-plus"></i>
              </PBtn>
            </Column>
          </Columns>
          <Columns className="is-multiline">
            {books.map((image, index) => {
              return image.img === "" ? (
                <div className="column is-3">
                  <form
                    data-path={image.path}
                    data-id={image._id}
                    onSubmit={saveBook}
                  >
                    <div className="image">
                      <img src={Temp} alt="" />
                      <p>{image.name}</p>
                    </div>
                    <label htmlFor="name">Book Title</label>
                    <Input
                      defaultValue={image.name}
                      placeholder="Book Name"
                      name="name"
                    />
                    <label htmlFor="img">Image Url</label>
                    <Input
                      defaultValue={image.img}
                      placeholder="Image URL"
                      name="img"
                    />
                    <label htmlFor="link">Book Store Link</label>
                    <Input
                      defaultValue={image.link}
                      placeholder="Link URL"
                      name="link"
                    />

                    <PBtn type="button" data={image._id} onClick={deleteBook}>
                      <i class="far fa-trash-alt"></i>
                    </PBtn>
                    <PBtn type="submit">Save</PBtn>
                  </form>
                </div>
              ) : (
                <div className="column is-3">
                  <form
                    data-path={image.path}
                    data-id={image._id}
                    onSubmit={saveBook}
                  >
                    <div className="image">
                      <img src={image.img} alt="" />
                      <p>{image.name}</p>
                    </div>

                    <label htmlFor="name">Book Title</label>
                    <Input
                      defaultValue={image.name}
                      placeholder="Book Name"
                      name="name"
                    />
                    <label htmlFor="img">Image Url</label>
                    <Input
                      defaultValue={image.img}
                      placeholder="Image URL"
                      name="img"
                    />
                    <label htmlFor="link">Book Store Link</label>
                    <Input
                      defaultValue={image.link}
                      placeholder="Link URL"
                      name="link"
                    />

                    <PBtn type="button" data={image._id} onClick={deleteBook}>
                      <i class="far fa-trash-alt"></i>
                    </PBtn>
                    <PBtn type="submit">Save</PBtn>
                  </form>
                </div>
              );
            })}
          </Columns>
        </Container>
      </ContainerFluid>
    </Layout>
  );
};

export default Books;
