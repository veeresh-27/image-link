import React, { useState } from "react";
import {  NavLink } from "react-router-dom";

export const Folders = ({ explorer }) => {
  const [expand, setExpand] = useState(false);

  // console.log(explorer);
  return (
    <>
      {explorer.isFolder ? (
        <div style={{}}>
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
                <Folders explorer={exp} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
        title={explorer.name} style={{width: "120px",
        cursor: "pointer",
        background: "gray",
        color: "white",
        margin: 4,
        padding: "4px",
        
        borderRadius: 4,}}>
          {" "}
          <span>📄 {explorer.name}</span>
        </div>
      )}
    </>
  );
};
