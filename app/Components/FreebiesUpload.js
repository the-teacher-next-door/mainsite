import React, { useState, useEffect } from "react";
import api from "../utils/api";

const Upload = props => {
  const [file, setFile] = useState("");
  const [text, setText] = useState("");
  const submit = e => {
    e.preventDefault();
    console.log(file);
    const fd = new FormData();
    fd.append("myImage", file, file.name);
    api.freebiesUpload(fd).then(done => {
      console.log(done);
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
    <form enctype="multipart/form-data" onSubmit={submit}>
      <p>{text}</p>
      <input type="file" name="myImage" onChange={change} id="file-input" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Upload;
