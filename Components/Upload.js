import React, { useState, useEffect } from "react";
import api from "../utils/api";

const Upload = props => {
  const [file, setFile] = useState("");
  const [text, setText] = useState("");
  const submit = e => {
    e.preventDefault();
    if (file !== "") {
      const fd = new FormData();
      fd.append("myImage", file, file.name);
      api.upload(fd).then(done => {
        console.log(done);
        if (done.data.msg === "File Uploaded") {
          setFile("");
          setText("File Uploaded");
          document.getElementById("file-input").value = null;
          props.loadImages();
        }
      });
    } else {
      setText("Please select a file.");
    }
  };

  const uploadImage = e => {
    const files = e.target.files;
    let x = new FormData();
    x.append("file", "anything");
    // x.append('upload_preset', 'tndMedia')

    // const res = await fetch('https://api.cloudinary.com/v1_1/dgyuis7i8/image/upload', {
    //   method: 'POST',
    //   body: data
    // })

    // const file = await res.json()

    //store file in db after upload...
    console.log(x);
    api.saveImage(x).then(done => {
      setText("Uploaded");
    });
  };
  return (
    <>
      <p>{text}</p>
      <input type="file" name="file" onChange={uploadImage} id="file-input" />
    </>
  );
};

export default Upload;
