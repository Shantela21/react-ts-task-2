import React from 'react'

export default function Navbar() {
  return (
    <div className="container">
      <div className="topnav">
        <a
          className="active"
          href="#home"
          style={{
            color: "black",
            paddingLeft: "5%",
            paddingRight: "5%",
            width: "25%",
            textAlign: "center",
          }}
        >
          Home
        </a>
        <a
          href="#product"
          style={{
            color: "black",
            paddingLeft: "5%",
            paddingRight: "5%",
            width: "25%",
            textAlign: "center",
          }}
        >
          Product
        </a>
        <a
          href="#blog"
          style={{
            color: "black",
            paddingLeft: "5%",
            paddingRight: "5%",
            width: "25%",
            textAlign: "center",
          }}
        >
          Blog
        </a>
        <a
          href="#about"
          style={{
            color: "black",
            paddingLeft: "5%",
            paddingRight: "5%",
            width: "25%",
            textAlign: "center",
          }}
        >
          About
        </a>
      </div>
    </div>
  );
}
