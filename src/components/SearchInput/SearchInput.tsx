import * as React from "react";
import "./SearchInput.css";

const SearchInput: React.FC = () => {
  return (
    <input
      type="text"
      placeholder="Ведите название организации"
      className="searchInput"
    />
  );
};

export default SearchInput;
