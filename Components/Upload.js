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


  const uploadImage = async (e) => {
    const files = e.target.files;
    console.log(files[0])
    let x = new FormData().append('file', files[0]);
    // x.append('upload_preset', 'tndMedia')

    // const res = await fetch('https://api.cloudinary.com/v1_1/dgyuis7i8/image/upload', {
    //   method: 'POST',
    //   body: data
    // })

    // const file = await res.json()

    //store file in db after upload...
    console.log(x)
    const dbSave = await api.saveImage(x);
    setText("Uploaded")
  }
  return (
    <>
      <p>{text}</p>
      <input type="file" name="file" onChange={uploadImage} id="file-input" />
    </>
  );
};

export default Upload;
