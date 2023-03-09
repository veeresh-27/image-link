import "./styles.css";
import { useState } from "react";

export function Header() {
  const [openMobNav, setOpenMobNav] = useState(false);
  const handleBurgerClick = () => {
    setOpenMobNav(!openMobNav);
  };
  return (
    <div className={openMobNav ? "navbar open" : "navbar"}>
      <div className="logo">
        <a href="/">Image Link</a>
      </div>
      {false && (
        <div className="burger" onClick={handleBurgerClick}>
          burger
        </div>
      )}
      {/* <div className="navLinks" onClick={handleBurgerClick}>
        <ul>
         
        </ul>
      </div> */}
    </div>
  );
}
