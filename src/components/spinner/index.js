import { ClipLoader, BarLoader, MoonLoader, FadeLoader } from "react-spinners";

export function Spinner({ color = "#000000", size = 30, text = "", type = "clip" }) {
  return (
    <div className="spinner" style={{ display: "flex", gap: "4px" }}>
      {type === "ClipLoader" ? <ClipLoader color={color} size={size} /> : null}
      {type === "BarLoader" ? <BarLoader color={color} size={size} /> : null}
      {type === "MoonLoader" ? <MoonLoader color={color} size={size} /> : null}
      {type === "FadeLoader" ? <FadeLoader color={color} size={size} /> : null}
      {text !== "" && <span style={{ color: `${color}` }}>{text}</span>}
    </div>
  );
}
