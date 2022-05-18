import { useState, useEffect, useRef } from "react";
import axios from "axios";

import UploadCanvas from "./canvases/UploadCanvas";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isUploaded, setIsUploaded] = useState(false);
  const drop = useRef(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    if (selectedFile) {
      handleSubmission();
    }
  }, [selectedFile]);

  function handleSubmission() {
    const formData = new FormData();

    formData.append("file", selectedFile);

    console.log(selectedFile);

    axios
      .post("https://jadu-web-api.herokuapp.com/upload/file", formData, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
        if (res.statusText == "OK") {
          setIsUploaded(true);
        }
      });
  }

  useEffect(() => {
    drop.current.addEventListener("dragover", handleDragOver);
    drop.current.addEventListener("drop", handleDrop);

    return () => {
      drop.current.removeEventListener("dragover", handleDragOver);
      drop.current.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    setIsUploaded(false);
    if (files && files.length) {
      var event = {
        target: { files: files },
      };
      changeHandler(event);
      // console.log(files[0]);
    }
  };

  return (
    <main className="wrap" ref={drop}>
      {isUploaded ? (
        <>
          <UploadCanvas selectedFile={selectedFile.name} />{" "}
        </>
      ) : (
        <div className="dropzone">
          <div className="placeholder">
            <p>Drag glTF or glb file here</p>
          </div>
          <div className="upload-btn">
            <input
              type="file"
              name="file-input[]"
              id="file-input"
              onChange={changeHandler}
            />

            <label htmlFor="file-input">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="17"
                viewBox="0 0 20 17"
              >
                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
              </svg>
              <span>Upload</span>
            </label>
          </div>
        </div>
      )}
    </main>
  );
};

export default Upload;
