import React from "react";
import Search from "./Search";
import Home from "./Home";
import Starred from "./Starred";
import Actor from "./Actor";

const Header = ({
  activeTab,
  handleActiveTab,
  handleRadioChange,
  selectedRadio,
  handleInputChange,
  searchQuery,
  isOn,
  handleSearchButtonClick,
  filteredData,
  filteredActorData,
  handleFavouriteButtonClick,
  starredShows,
}) => {
  return (
    <header className="header-container">
      <div className="heading-text">
        <h1>Box Office</h1>
        <p className="heading-title">Are you looking for a movie or an actor</p>
      </div>
      <div className="navbar-container">
        <nav className="navbar">
          <ul>
            <li
              className={`tab-class ${
                activeTab === "Home" ? "active-tab" : ""
              }`}
              onClick={() => handleActiveTab("Home")}
            >
              <span>Home</span>
            </li>

            <li
              className={`tab-class ${
                activeTab === "Starred" ? "active-tab" : ""
              }`}
              onClick={() => handleActiveTab("Starred")}
            >
              <span>Starred</span>
            </li>
          </ul>
        </nav>
        <Search
          handleInputChange={handleInputChange}
          searchQuery={searchQuery}
        />
      </div>
      <div className="radio-container">
        <label htmlFor="search-show" className="search-container">
          Shows
          <input
            id="search-show"
            type="radio"
            value="show"
            checked={selectedRadio === "show"}
            onChange={handleRadioChange}
          />
          <span className="light"></span>
        </label>
        <label htmlFor="search-actor" className="search-container">
          Actors
          <input
            id="search-actor"
            type="radio"
            value="people"
            checked={selectedRadio === "people"}
            onChange={handleRadioChange}
          />
          <span className="light"></span>
        </label>
      </div>
      <div>
        <button
          type="button"
          className="search-button"
          onClick={handleSearchButtonClick}
        >
          Search
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "Home" ? (
          selectedRadio === "show" && filteredData.length > 0 ? (
            <Home
              showData={filteredData}
              isOn={isOn}
              handleFavouriteButtonClick={handleFavouriteButtonClick}
            />
          ) : selectedRadio === "people" && filteredActorData.length > 0 ? (
            <Actor actorData={filteredActorData} isOn={isOn} />
          ) : (
            <div className="loader">No results found</div>
          )
        ) : (
          <Starred starredShows={starredShows} />
        )}
      </div>
    </header>
  );
};

export default Header;
