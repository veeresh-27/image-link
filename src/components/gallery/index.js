import "./styles.css";
import { useState } from "react";
import { DownloadIcon } from "./../../assets/icons/downloadIcon";
import { IconCopyLink } from "../../assets/icons/iconCopyLink";
import { IconOptions } from "./../../assets/icons/options";
import { Spinner } from "../spinner";

export function Gallery({ images }) {
  return (
    <div className="image__gallery">
      {images.length > 0 ? images.map((img, index) => <ImageItem key={index} img={img} />):<Spinner size={200} type='FadeLoader'/>}
    </div>
  );
}

const ImageItem = ({ img }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [copyBtn, setCopyBtn] = useState(true);
  const handleDownload = async (url, name) => {
    setDownloadBtn(false);
    const response = await fetch(url, {
      headers: {
        "Content-Disposition": 'attachment; filename="my-image.jpg"',
      },
    });
    const blob = await response.blob();
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = URL.createObjectURL(blob);
    a.download = `${name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloadBtn(true);
  };
  const copyToClipboard = async (url) => {
    setCopyBtn(false);
    try {
      await navigator.clipboard.writeText(`${url}`);
      alert(`Link copied to clipboard`);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    } finally {
      setCopyBtn(true);
    }
  };
  return (
    <>
      {img ? (
        <div
          className="image__item"
          onMouseOver={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}>
          <img title={img.name} src={img.link} alt={"main"} />
          {showOptions && (
            <>
              <div className="image__opt">
                <IconOptions />
              </div>
              <div className="image__btn">
                {copyBtn ? (
                  <button
                    title="Copy Link"
                    className="copy__btn"
                    onClick={() => copyBtn && copyToClipboard(img.link)}>
                    <IconCopyLink />
                  </button>
                ) : (
                  <button title="Copy Link" className="copy__btn">
                    <Spinner color="#ffffff" size={20} type='MoonLoader'/>
                  </button>
                )}{" "}
                {downloadBtn ? (
                  <div
                    title="Download"
                    className="download__btn"
                    onClick={() => downloadBtn && handleDownload(img.link, img.name)}>
                    <DownloadIcon />
                  </div>
                ) : (
                  <div title="Download" className="download__btn">
                    <Spinner color="#ffffff" size={20} type='MoonLoader' />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
