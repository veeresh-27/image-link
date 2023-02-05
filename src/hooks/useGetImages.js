import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../Firebase";
import { useEffect, useState } from "react";

export function useGetImages({ folderName }) {
  const imageListRef = ref(storage, `${folderName}/`);
  const [images, setImages] = useState([]);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
          let addImg = true;
          images.forEach((img) => {
            if (img === url) {
              addImg = false;
              console.log({ addImg });
              return;
            }
          });
          if (addImg) {
            setImages((prev) => [...prev, url]);
          }
        });
      });
    });
  }, []);

  return { images };
}
