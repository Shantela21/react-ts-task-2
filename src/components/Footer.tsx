import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <div>
      <div className="footer">
        <p>Footer </p>
        <p>|</p>
        <div className="icons">
          <button
            style={{
              height: "4.5vh",
              marginTop: "1%",
              backgroundColor: "rgb(255, 255, 255)",
              border: "none",
            }}
          >
            <FaFacebook
              href="#"
              className="facebook"
              style={{
                backgroundColor: " #3B5998",
                color: "white",
              }}
            ></FaFacebook>
          </button>

          <button
            style={{
              height: "4.5vh",
              marginTop: "1%",
              backgroundColor: "rgb(255, 255, 255)",
              border: "none",
            }}
          >
            <FaGithub
              href="https://github.com/Shantela21"
              className="github"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            ></FaGithub>
          </button>

          <button
            style={{
              height: "4.5vh",
              marginTop: "1%",
              backgroundColor: "rgb(255, 255, 255)",
              border: "none",
            }}
          >
            <FaLinkedin
              href="#"
              className="linkedin"
              style={{ background: "#007bb5", color: "white" }}
            ></FaLinkedin>
          </button>

          <button
            style={{
              height: "4.5vh",
              marginTop: "1%",
              marginBottom: "1%",
              backgroundColor: "rgb(255, 255, 255)",
              border: "none",
            }}
          >
            <FaInstagram
              href="#"
              className="instagram"
              style={{ background: "#ca55a7ff", color: "white" }}
            ></FaInstagram>
          </button>
        </div>
      </div>
    </div>
  );
}
