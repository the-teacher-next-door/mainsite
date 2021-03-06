import React, { useState, useEffect } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import PBtn from "../Components/PBtn";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Input from "../Components/Input";
import _ from "lodash";
import api from "../utils/api";
import Layout from "../Components/Layout/Layout";
import ToggleSwitch from "../Components/ToggleSwitch";
import createImagePlugin from "draft-js-image-plugin";
import Toast from "../Components/toast";
import DynamicComponent from "../Components/Dynamic";
import Container from "../Components/FormatComponents/Container";
import Columns from "../Components/FormatComponents/Columns";
import Column from "../Components/FormatComponents/Column";
import ContainerFluid from "../Components/FormatComponents/ContainerFluid";
import AdminTopBar from "../Components/AdminTopBar/AdminTopBar";

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const NewBlog = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorHTML, setEditorHTML] = useState({ __html: "<div></div>" });
  const [titleInputVal, setTitleInputVal] = useState("");
  const [id, setId] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [cleanTitle, setCleanTitle] = useState("");

  const [live, setLive] = useState(false);
  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState();
  const [toastText, setToastText] = useState("");
  const [toastClass, setToastClass] = useState("hide");
  const [menuClass, setMenuClass] = useState("hide");
  const [date, setDate] = useState("");

  useEffect(() => {
    let url = window.location.href.split("/");

    //need to convert from raw
    api.loadBlogAdmin(url[4]).then(blog => {
      setTitleInputVal(blog.data.title);
      setId(blog.data._id);
      setImageurl(blog.data.img);
      setCleanTitle(blog.data.cleanTitle);
      setLive(blog.data.live);
      setCategory(blog.data.category);
      setDate(blog.data.date);
      console.log(blog);

      // let changingImgUrl =
      //   "https://www.the-teacher-next-door.com/public/uploads/" +
      //   blog.data.img.split("/")[5];

      // setTimeout(() => {
      //   replaceImages(
      //     blog.data.blog,
      //     blog.data._id,
      //     changingImgUrl,
      //     blog.data.category,
      //     blog.data.live,
      //     blog.data.title
      //   );
      // }, 3000);

      const blocksFromHTML = htmlToDraft(blog.data.blog);
      const { contentBlocks, entityMap } = blocksFromHTML;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );

      setEditorState(EditorState.createWithContent(contentState));
      setEditorHTML({ __html: blog.data.blog });
      if (blog.data.live === true) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    });

    return () => {};
  }, []);

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
    setEditorHTML({
      __html: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  };

  const toggleLive = async () => {
    let change;

    if (live) {
      change = false;
    } else {
      change = true;
    }

    if (titleInputVal !== "") {
      if (category !== "category") {
        let data = {
          username: props.username,
          blog: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          title: titleInputVal,
          id: id,
          img: imageurl,
          category: category,
          live: change
        };

        const res = await api.saveBlog(data);
        if (res.data !== null || res.data !== undefined) {
          if (res.data.err === "duplicate title") {
            setToastText("That title already exists.");
            showToast();
          } else {
            setToastText("Blog Saved!");
            showToast();
            setLive(change);
            if (checked === true) {
              setChecked(false);
            } else {
              setChecked(true);
            }
          }
        }
      } else {
        setToastText("A Category must be selected.");
        showToast();
      }
    } else {
      setToastText("Title must not be empty.");
      showToast();
    }
  };

  // //replace all images with correct format
  // const replaceImages = async (blog, id, imgX, category, live, titleX) => {
  //   let allImages = await api.loadImages();
  //   let fakeEle = document.createElement("div");

  //   fakeEle.innerHTML = blog;

  //   let fakeImages = fakeEle.getElementsByTagName("img");
  //   for (let i = 0; i < fakeImages.length; i++) {
  //     if (!fakeImages[i].src.includes("data:")) {
  //       let img = fakeImages[i];
  //       let imageName;
  //       //all the images on the page
  //       console.log(img.src.split("/").length);
  //       if (img.src.split("/").length === 5) {
  //         imageName = img.src.split("/")[4];
  //         allImages.data.forEach(currentImage => {
  //           if (currentImage.filename === imageName) {
  //             console.log(currentImage.filename);
  //             img.src =
  //               "https://the-teacher-next-door.com/public/uploads/" +
  //               currentImage.filename;
  //           }
  //         });
  //       } else if (img.src.split("/").length === 6) {
  //         imageName = img.src.split("/")[5];
  //         console.log(imageName);
  //         allImages.data.forEach(currentImage => {
  //           console.log(currentImage.originalname);
  //           if (currentImage.filename === imageName) {
  //             console.log(currentImage.filename);
  //             img.src =
  //               "https://the-teacher-next-door.com/public/uploads/" +
  //               currentImage.filename;
  //           }
  //         });
  //       }
  //     }

  //     console.log("inner " + fakeEle.innerHTML);

  //     let data = {
  //       username: props.username,
  //       blog: fakeEle.innerHTML,
  //       title: titleX,
  //       id: id,
  //       img: imgX,
  //       category: category,
  //       live: live
  //     };

  //     console.log(data);

  //     const res = await api.saveBlog(data);
  //     console.log(res);
  //   }
  // };

  const save = async () => {
    if (titleInputVal !== "") {
      if (category !== "category") {
        console.log("save");
        let data;
        if (cleanTitle === "") {
          data = {
            username: props.username,
            blog: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            title: titleInputVal,
            id: id,
            cleanTitle: titleInputVal,
            img: imageurl,
            category: category,
            live: live,
            setCleanManual: false
          };
        } else {
          data = {
            username: props.username,
            blog: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            title: titleInputVal,
            id: id,
            cleanTitle,
            img: imageurl,
            category: category,
            live: live,
            setCleanManual: true
          };
        }

        console.log(data);
        const res = await api.saveBlog(data);

        if (res.data !== null || res.data !== undefined) {
          if (res.data.err === "duplicate title") {
            setToastText("That title already exists.");
            showToast();
          } else {
            setToastText("Blog Saved!");
            showToast();
          }
        }
      } else {
        setToastText("A category must be selected.");
        showToast();
      }
    } else {
      setToastText("Title must not be empty.");
      showToast();
    }
  };

  const deleteBlog = e => {
    api.deleteBlog(id).then(res => {
      console.log(res);
      if (res.data === "deleted") {
        window.location.href = "/admin";
      }
    });
  };
  const handleChange = event => {
    if (event.target.name === "titleInputVal") {
      setTitleInputVal(event.target.value);
    }

    if (event.target.name === "imageurl") {
      setImageurl(event.target.value);
    }

    if (event.target.name === "category") {
      setCategory(event.target.value);
    }

    if (event.target.name === "blogUrl") {
      setCleanTitle(event.target.value);
    }
  };

  const selectChange = event => {
    if (event.target.name === "tags") {
      console.log(event.target.value);
      setCategory(event.target.value);
      console.log(category);
    }
  };

  const showToast = () => {
    setToastClass("showToast");
    setTimeout(() => {
      setToastClass("hideToast");
    }, 5000);

    setTimeout(() => {
      setToastText("");
    }, 7000);
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
      <AdminNav active="blogs" className={menuClass}></AdminNav>
      <ContainerFluid className="admin new-blog">
        <Container>
          <Columns className="is-centered">
            <Column className="is-8">
              <div className="editorContent preview">
                <div className="toolbar">
                  <div className="buttons">
                    <PBtn onClick={save}>
                      <i className="far fa-save"></i>
                    </PBtn>
                    Image Url:
                    <Input
                      placeholder="Image URL"
                      className="img-input"
                      value={imageurl}
                      name="imageurl"
                      onChange={handleChange}
                    />
                    Blog Custom Url:
                    <Input
                      placeholder="Blog Custom URL"
                      className="img-input"
                      value={cleanTitle}
                      name="blogUrl"
                      onChange={handleChange}
                    />
                    <select
                      id="categorySelect"
                      name="tags"
                      value={category}
                      onChange={selectChange}
                    >
                      <option value="category" defaultValue="selected">
                        Select a Category
                      </option>
                      <option value="Reading">Reading</option>
                      <option value="Writing">Writing & Grammar</option>
                      <option value="Math">Math</option>
                      <option value="Holidays">Holidays</option>
                      <option value="Ideas">Classroom Ideas</option>
                    </select>
                    <PBtn onClick={deleteBlog}>
                      <i className="far fa-trash-alt"></i>
                    </PBtn>
                  </div>
                  <span>
                    <ToggleSwitch
                      checkboxChange={toggleLive}
                      checked={checked}
                    />
                  </span>
                </div>

                <div className="title">
                  <Input
                    type="textbox"
                    className="title-box"
                    placeholder="Title"
                    onChange={handleChange}
                    name="titleInputVal"
                    value={titleInputVal}
                  />
                </div>

                <DynamicComponent
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  editorClassName="editorWrapper"
                  toolbar={{
                    textAlign: {
                      options: []
                    },
                    fontSize: {
                      options: ["10", "15", "20", "30", "40", "50"]
                    },
                    fontFamily: {
                      options: ["Roboto", "Lato", "Cabin"]
                    }
                  }}
                />
              </div>
            </Column>
          </Columns>
        </Container>
      </ContainerFluid>
    </Layout>
  );
};

export default NewBlog;
