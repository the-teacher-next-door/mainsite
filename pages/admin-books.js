import React, { useState, useEffect } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import api from "../utils/api";
import FreebiesUpload from "../Components/FreebiesUpload";
import PBtn from "../Components/PBtn";
import Layout from "../Components/Layout/Layout";
import Input from "../Components/Input";
import Link from "next/link";
import Temp from "../images/tempImg.png";
const Books = props => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    api.loadBooks().then(data => {
      console.log("run");
      setBooks(data.data);
      console.log(data.data);
    });
  };

  const deleteBook = e => {
    let data = {
      path: e.target.dataset.path
    };
    api.deleteBook(data).then(done => {
      console.log(done);
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
      <div className="container-fluid admin">
        <AdminNav />
        <div className="container">
          <div className="row-contained">
            <div className="col-xl-12">
              <div className="blogs">
                <div className="blogs-header-bar">
                  <h2>Books</h2>
                  <span className="ml-auto">
                    <PBtn onClick={newBook} />
                  </span>
                </div>
              </div>

              <div className="columns is-multiline">
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

                        <Input
                          defaultValue={image.name}
                          placeholder="Book Name"
                          name="name"
                        />
                        <Input
                          defaultValue={image.img}
                          placeholder="Image URL"
                          name="img"
                        />
                        <Input
                          defaultValue={image.link}
                          placeholder="Link URL"
                          name="link"
                        />
                        <Link href={image.path}>
                          <a>Download</a>
                        </Link>
                        <button
                          type="button"
                          data-path={image.path}
                          onClick={deleteBook}
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
                        onSubmit={saveBook}
                      >
                        <div className="image">
                          <img src={image.img} alt="" />
                          <p>{image.name}</p>
                        </div>
                        <Input
                          defaultValue={image.name}
                          placeholder="Book Name"
                          name="name"
                        />
                        <Input
                          defaultValue={image.img}
                          placeholder="Image URL"
                          name="img"
                        />
                        <Input
                          defaultValue={image.link}
                          placeholder="Link URL"
                          name="link"
                        />
                        <Link href={image.path}>
                          <a>Download</a>
                        </Link>
                        <button
                          type="button"
                          data-path={image.path}
                          onClick={deleteBook}
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

export default Books;
