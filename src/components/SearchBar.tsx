import React from "react";
import { FaSearch } from "react-icons/fa";
type SearchBarProps = {
  searchValue: string;
  onSearchChange: (val: string) => void;
  onSearch: () => void;
};
export default function SearchBar({
  searchValue,
  onSearchChange,
  onSearch,
}: SearchBarProps) {
  return (
    <div>
      <form
        className="search-container"
        style={{}}
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <FaSearch id="search-btn" size="20px" />
        <input
          type="text"
          alt="search"
          id="search-bar"
          style={{ border: "none" }}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button type="submit" style={{ display: "none" }} aria-hidden>
          Search
        </button>
      </form>
    </div>
  );
}
