import React from "react";
import { FaSearch } from "react-icons/fa";
type SearchBarProps = {
  searchValue: string;
  onSearchChange: (val: string) => void;
};
export default function SearchBar({ searchValue, onSearchChange }: SearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const handleIconClick = () => {
    inputRef.current?.focus();
  };
  return (
    <div>
      <div className="search-container">
        <input
          ref={inputRef}
          type="text"
          id="search-bar"
          className="search-input"
          placeholder="Search links..."
          aria-label="Search links"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button
          type="button"
          className="search-icon"
          aria-label="Focus search input"
          onClick={handleIconClick}
        >
          <FaSearch size={18} />
        </button>
      </div>
    </div>
  );
}
