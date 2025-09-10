import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div>
      <div className="search-container" style={{}}>
        <FaSearch id="search-btn" size="20px" />
        <input
          type="text"
          alt="search"
          id="search-bar"
          style={{ border: "none" }}
        ></input>
      </div>
    </div>
  );
}
