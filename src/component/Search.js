import React from "react";

const Search = ({ searchQuery, handleInputChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for shows or actors"
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};

export default Search;
