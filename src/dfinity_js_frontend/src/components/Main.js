import React, { useEffect, useState } from "react";
import { Typography, Paper, Button } from "@mui/material";
import purpleHDpic from "./../assets/img/purpleHDpic.jpg";
import "./Main.css";
import { useLocation, useNavigate } from "react-router-dom";

// Main color scheme: #0097da (blue)
// complement color: #da7000 (orange)

// #006699 (Slightly darker blue)
// #33a1e2 (Slightly lighter blue)

const Main = () => {
  const [currLink, setCurrLink] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkTransfer = (level) => {
    const params = new URLSearchParams(location.search);
    const canisterId = params.get("canisterId");
    if (canisterId) {
      navigate(`/chat?canisterId=${canisterId}#${level}`);
    } else {
      navigate(`/chat#${level}`);
    }
  };
  return (
    <>
      <div className="top-section">
        <div className="overlay-text">
          <Typography
            variant="h3"
            style={{
              color: "#edf3f6",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
            }}
          >
            <strong>
              Welcome to Blockch<span style={{ color: "#0097da" }}>AI</span>n{" "}
              Buddy <br />
              Your AI-Assisted Journey into Blockchain Wisdom
            </strong>
          </Typography>
        </div>
        <img
          src={purpleHDpic}
          alt="Top Section Image"
          className="top-image"
          style={{
            width: "100vw",
            height: "22vw",
            objectFit: "cover",
            overflow: "hidden",
          }}
        />
      </div>

      <div className="main-container">
        <Paper
          elevation={3}
          style={{
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.87)",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease-in-out",
            width: "350px",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            <strong>Beginner Bot</strong>
          </Typography>
          <Typography
            variant="body2"
            style={{ padding: "0 16px", marginBottom: "8px" }}
          >
            <strong style={{ color: "#da7000" }}>
              Start your blockchain journey{" "}
            </strong>
            with our Beginner Bot! Perfect for those new to blockchain.
          </Typography>
          <div className="Buttons">
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "8px", backgroundColor: "#0097da" }}
              onClick={() => handleLinkTransfer("beginner")}
            >
              Chat
            </Button>
          </div>
        </Paper>

        <Paper
          elevation={3}
          style={{
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.87)",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease-in-out",
            width: "350px",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "50px",
            marginLeft: "50px",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            <strong>Intermediate Bot</strong>
          </Typography>
          <Typography
            variant="body2"
            style={{ padding: "0 16px", marginBottom: "8px" }}
          >
            <strong style={{ color: "#da7000" }}>
              Dive deeper into blockchain{" "}
            </strong>
            concepts with our Intermediate Bot! Explore more advanced topics.
          </Typography>
          <div className="Buttons">
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "8px", backgroundColor: "#0097da" }}
              onClick={() => handleLinkTransfer("intermediate")}
            >
              Chat
            </Button>
          </div>
        </Paper>

        <Paper
          elevation={3}
          style={{
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.87)",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease-in-out",
            width: "350px",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            <strong>Expert Bot</strong>
          </Typography>
          <Typography
            variant="body2"
            style={{ padding: "0 16px", marginBottom: "8px" }}
          >
            <strong style={{ color: "#da7000" }}>
              Elevate your blockchain expertise{" "}
            </strong>
            with our Expert Bot! Get in-depth insights and answers.
          </Typography>
          <div className="Buttons">
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "8px", backgroundColor: "#0097da" }}
              onClick={() => handleLinkTransfer("expert")}
            >
              Chat
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Main;
