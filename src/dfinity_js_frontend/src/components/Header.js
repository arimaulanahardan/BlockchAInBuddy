import React, { useEffect } from "react";
import logo from "../assets/img/BlockchainBuddyIcon.png";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClicked = () => {
    const params = new URLSearchParams(location.search);
    const canisterId = params.get("canisterId");
    if (canisterId) {
      navigate(`/?canisterId=${canisterId}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <header className="header">
      <div className="header-container" onClick={handleClicked}>
        <img className="logo" src={logo} alt="Blockchain Buddy Icon" />
        <div className="title-container" onClick={handleClicked}>
          <h1 className="title">
            Blockch<span style={{ color: "#0097da" }}>AI</span>n Buddy
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
