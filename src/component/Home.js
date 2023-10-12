import React from "react";
import Search from "./Search";
import Starred from "./Starred";
import Actor from "./Actor";
import ShowDetails from "./ShowDetails";
import axios from "axios";
import { useState, useEffect } from "react";



const Home = ({isOn}) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedRadio, setSelectedRadio] = useState("show");
  const [searchQuery, setSearchQuery] = useState("");

  const [showData, setShowData] = useState([]);
  const [actorData, setActorData] = useState([]);
  const [starredShows, setStarredShows] = useState([]);
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
    setShowData([])
    setActorData([])
  };

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
    setShowData([])
    setActorData([])
  };
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  /**
   * https://api.tvmaze.com/shows/1?embed[]=episodes&embed[]=cast
   * https://api.tvmaze.com/search/people?q=shanu
   * https://api.tvmaze.com/search/shows?q=girls
   */

  const handleShowSearch = async () => {
    try {
      if (searchQuery.trim() === "") {
        setShowData([]);
        return;
      }
      if (selectedRadio === "show") {
        const { data } = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${searchQuery}`
        );

        // Filter the data based on the searchQuery
        const filteredData = data.filter((item) =>
          item?.show?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setShowData(filteredData);
      } else if (selectedRadio === "people") {
        const { data } = await axios.get(
          `https://api.tvmaze.com/search/people?q=${searchQuery}`
        );
        const filteredActorData = data?.filter((item) =>
          item?.person?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setActorData(filteredActorData);
      }
      setSearchQuery('')
    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShowSearch();
  }, []);

  const handleSearchButtonClick = () => {
    handleShowSearch();
   
  };

  const isStarred = (item) =>
    starredShows.some((show) => show.show.id === item.show.id); // Define isStarred function

  const addToStarred = (show) => {
    setStarredShows([...starredShows, show]);
  };

  // Callback function to remove a show from the starred list
  const removeFromStarred = (show) => {
    const updatedStarredShows = starredShows.filter(
      (starredShow) => starredShow.show.id !== show.show.id
    );
    setStarredShows(updatedStarredShows);
  };

  const handleFavouriteButtonClick = (item) => {
    if (!isStarred(item)) {
      // Add to starred shows
      addToStarred(item);
      console.log(item, "ggg");
    } else {
      // Remove from starred shows
      removeFromStarred(item);
    }
  };

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
          selectedRadio === "show" && showData.length > 0 ? (
            <ShowDetails
             showData={showData}
              isOn={isOn}
              handleFavouriteButtonClick={handleFavouriteButtonClick}
            />
          ) : selectedRadio === "people" && actorData.length > 0 ? (
            <Actor actorData={actorData} isOn={isOn} />
          ) : (
            <div className="loader">No results found</div>
          )
        ) : (
          <Starred starredShows={starredShows} removeFromStarred={removeFromStarred} isOn={isOn}/>
        )}
      </div>
    </header>
  );
};

export default Home;

/**
 * {
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
  removeFromStarred
}
 * 
 */