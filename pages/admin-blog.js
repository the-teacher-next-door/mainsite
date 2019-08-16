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
import EditorNew from "../Components/Editor";
import Layout from "../Components/Layout/Layout";
import ToggleSwitch from "../Components/ToggleSwitch";
import createImagePlugin from "draft-js-image-plugin";
import Toast from "../Components/toast";
import DynamicComponent from "../Components/Dynamic";

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const NewBlog = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorHTML, setEditorHTML] = useState({ __html: "<div></div>" });
  const [titleInputVal, setTitleInputVal] = useState("");
  const [descriptionVal, setDescriptionVal] = useState("");
  const [id, setId] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [live, setLive] = useState(false);
  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState();
  const [toastText, setToastText] = useState("");
  const [toastClass, setToastClass] = useState("hide");

  useEffect(() => {
    let url = window.location.href.split("/");

    //need to convert from raw
    api.loadBlog(url[4]).then(blog => {
      setTitleInputVal(blog.data.title);
      setId(blog.data._id);
      setImageurl(blog.data.img);
      setLive(blog.data.live);
      setDescriptionVal(blog.data.description);
      setCategory(blog.data.category);
      console.log(blog);

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

    return () => {
      console.log("cleaning up");
    };
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
          live: change,
          description: descriptionVal
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

  const save = async () => {
    // TODO convertToRaw and save to db
    //TODO convertFromRaw on blogPage w/ editor set to readonly

    if (titleInputVal !== "") {
      if (category !== "category") {
        console.log("save");
        let data = {
          username: props.username,
          blog: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          title: titleInputVal,
          id: id,
          img: imageurl,
          category: category,
          live: live,
          description: descriptionVal
        };

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

    if (event.target.name === "descriptionVal") {
      setDescriptionVal(event.target.value);
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
  return (
    <Layout>
      <Toast className={toastClass} text={toastText} />
      <div className="container-fluid new-blog">
        <AdminNav title="Admin Panel">
          <PBtn onClick={props.logout}>Logout</PBtn>
        </AdminNav>

        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="editorContent">
                <div className="sidebar"></div>

                <div className="toolbar">
                  <div>
                    <PBtn onClick={save}>
                      <i className="far fa-save"></i>
                    </PBtn>
                    <PBtn onClick={toggleLive}>Preview</PBtn>
                    <Input
                      placeholder="Image URL"
                      className="img-input"
                      value={imageurl}
                      name="imageurl"
                      onChange={handleChange}
                    />
                  </div>
                  <ToggleSwitch checkboxChange={toggleLive} checked={checked} />

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
                </div>
                <div className="description">
                  <Input
                    type="textbox"
                    className="description-box"
                    placeholder="Description"
                    onChange={handleChange}
                    name="descriptionVal"
                    value={descriptionVal}
                    maxLength="140"
                  />
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

                <div className="editorWrapper">
                  <div>
                    <DynamicComponent
                      editorState={editorState}
                      onEditorStateChange={onEditorStateChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewBlog;
