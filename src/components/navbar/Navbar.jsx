import React from "react";
import "./navbar-models.css";
import logoImage from "../../assest/logo-image.png";
const Navbar = () => {
  return (
    <nav className="map___container--nav">
      <img src={logoImage} alt="logoImage" />
    </nav>
  );
};

export default Navbar;
