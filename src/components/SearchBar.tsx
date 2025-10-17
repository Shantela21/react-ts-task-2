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
        <input
          type="text"
          alt="search"
          id="search-bar"
          style={{ border: "none" }}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button type="submit" className="search-icon-btn">
          <FaSearch size="20px"  />
        </button>
      </form>
    </div>
  );
}
