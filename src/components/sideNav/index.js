import React, { useState, useEffect } from "react";
import { storage } from "../../Firebase";
import { ref } from "firebase/storage";

export const SideNav = ({ explorer, setFolder, folder, setImageListRef }) => {
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    if (explorer.name === "root") {
      setExpand(true);
    }
    if (explorer.name === folder) {
      setExpand(true);
    }
  }, [explorer.name]);
  return (
    <>
      {explorer.isFolder ? (
        <div style={{position:'fixed', backgroundColor:'white'}}>
          <div
            href={explorer.link}
            title={explorer.name}
            onClick={() => setExpand(!expand)}
            style={{
              display: "flex",
              fontSize: "14px",
              justifyContent: "space-between",
              width: "120px",
              cursor: "pointer",
              background: "gray",
              color: "white",
              margin: 4,
              padding: "4px",
              borderRadius: 4,
            }}>
            {" "}
            <span> {expand ? `👇 ${explorer.name}` : `👉 ${explorer.name}`}</span>
            <button>➕</button>
          </div>
          <div>
            {explorer?.children?.map((exp) => (
              <div
                key={exp.id}
                style={{
                  display: `${expand ? "flex" : "none"}`,
                  paddingLeft: "16px",
                  cursor: "pointer",
                }}>
                <SideNav
                  explorer={exp}
                  setFolder={setFolder}
                  folder={folder}
                  setImageListRef={setImageListRef}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          title={explorer.name}
          style={{
            width: "120px",
            fontSize: "14px",
            cursor: "pointer",
            background: "gray",
            color: "white",
            margin: 4,
            padding: "4px",
            borderRadius: 4,
          }}
          onClick={(e) => {
            setImageListRef(ref(storage, `${explorer.name}/`));
            setFolder(`${explorer.name}`);
          }}>
          {" "}
          <span>📄 {explorer.name}</span>
        </div>
      )}
    </>
  );
};
