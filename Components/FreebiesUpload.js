import React, { useState, useEffect } from "react";
import api from "../utils/api";

const Upload = props => {
  const [file, setFile] = useState("");
  const [text, setText] = useState("");
  const submit = e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("myFile", file, file.name);
    api.freebiesUpload(fd).then(done => {
      if (done.data.msg === "File Uploaded") {
        setFile("");
        setText("File Uploaded");
        document.getElementById("file-input").value = null;
        props.loadImages();
      }
    });
  };

  const change = e => {
    setFile(e.target.files[0]);
  };
  return (
    <form encType="multipart/form-data" onSubmit={submit}>
      <p>{text}</p>
      <input type="file" name="myFile" onChange={change} id="file-input" />
      <button type="submit">
        {" "}
        <i className="fas fa-upload"></i>
      </button>
    </form>
  );
};

export default Upload;
