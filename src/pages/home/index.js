import React, { useState, useEffect } from "react";
import { storage } from "../../Firebase";
import { ref, uploadBytes, getDownloadURL, listAll, getMetadata } from "firebase/storage";
import { v4 } from "uuid";
import { Gallery } from "../../components/gallery";
import { getFileName } from "../../helper/getFileName";
import { Spinner } from "../../components/spinner";
import { explorer } from "./../../data/folderData";
import { SideNav } from "../../components/sideNav";

function Home() {
  const [uploadImage, setUploadImage] = useState(null);
  const [folder, setFolder] = useState("");
  const [galleryLoader, setGalleryLoader] = useState(false);
  const [uploadBtn, setUploadBtn] = useState(true);
  const [images, setImages] = useState([]);
  const [imageListRef, setImageListRef] = useState(ref(storage, `${folder}/`));

  const handleUpload = () => {
    if (uploadImage === null) {
      alert("Please select an image");
      return;
    }
    setUploadBtn(false);
    const imageRef = ref(storage, `${folder}/${v4() + "_" + uploadImage.name}`);
    uploadBytes(imageRef, uploadImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        getMetadata(snapshot.ref).then((data) => {
          const obj = {
            name: snapshot.ref.name,
            originalName: getFileName(snapshot.ref.name),
            fullPath: snapshot.ref.fullPath,
            parent: snapshot.ref.parent.name,
            root: snapshot.ref.root.name,
            link: url,
            size: data.size,
            created: data.timeCreated,
            updated: data.updated,
            contentType: data.contentType,
            item: snapshot.ref,
          };
          setImages((prev) => [...prev, obj]);
          alert("image uploaded");
          setUploadBtn(true);
          setUploadImage(null);
        });
      });
    });
  };

  useEffect(() => {
    if (folder === "") {
      return;
    }
    setGalleryLoader(true);
    setImages([]);
    listAll(imageListRef).then((response) => {
      // console.log(response);
      console.log(imageListRef);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          getMetadata(item).then((data) => {
            // console.log(data);
            let addImg = true;
            images.forEach((img) => {
              if (img.fullPath === item.fullPath) {
                addImg = false;
                return;
              }
            });
            if (addImg) {
              const obj = {
                name: item.name,
                originalName: getFileName(item.name),
                fullPath: item.fullPath,
                parent: item.parent.name,
                root: item.root.name,
                link: url,
                size: data.size,
                created: data.timeCreated,
                updated: data.updated,
                contentType: data.contentType,
                item: item,
              };
              setImages((prev) => [...prev, obj]);
            }
          });
        });
      });
    });
    setGalleryLoader(false);
    // eslint-disable-next-line
  }, [imageListRef]);

  return (
    <>
      {/* <Folderss explorer={explorer} /> */}
      <SideNav
        explorer={explorer}
        setFolder={setFolder}
        folder={folder}
        setImageListRef={setImageListRef}
      />
      {folder !== "" ? (
        <div className="app__container">
          <div className="upload__file">
            <label htmlFor="upload-image" className="upload__label">
              {uploadImage ? uploadImage.name : "Choose Image"}
            </label>
            <input
              className="upload-image"
              id="upload-image"
              style={{ display: "none" }}
              type="file"
              onChange={(e) => setUploadImage(e.target.files[0])}
              title="Choose Image"
              aria-label="Choose Image"
            />
          </div>

          <div>
            {uploadBtn ? (
              <button className="button" onClick={handleUpload}>
                Uplaod Image
              </button>
            ) : (
              <button className="disButton">
                <Spinner color="#ffffff" size={20} type="BarLoader" />
              </button>
            )}
          </div>
          {/* <div>
          <select
            className="select"
            value={folder}
            onChange={(e) => {
              setImageListRef(ref(storage, `${e.target.value}/`));
              setFolder(`${e.target.value}`);
            }}>
            <option value="images">images</option>
            <option value="photo">photo</option>
          </select>
        </div> */}
          {!galleryLoader ? <Gallery images={images} /> : null}
        </div>
      ) : (
        <div className="app__container">Please select a file</div>
      )}
    </>
  );
}

export default Home;
