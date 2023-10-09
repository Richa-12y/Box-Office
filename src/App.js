import { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./component/Header";
import axios from "axios";

const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  background-image: url("https://gaganpreetkaurkalsi.github.io/Box-Office/static/media/background.8d3e0688.png");
  background-color: ${(props) => (props.isOn ? "#ffffff" : "#000000")};
  color: ${(props) => (props.isOn ? "#000000" : "#ffffff")};
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: start;
  cursor: pointer;
  justify-content: end;
  width: 98%;
  margin-top: 10px;
`;

const ToggleSlider = styled.div`
  width: 50px;
  height: 20px;
  border-radius: 15px;
  background-color: ${(props) => (props.isOn ? "black" : "white")};
  transition: background-color 0.2s;
  justify-content: end;
  display: flex;
  align-items: center;
  padding: 3px;
  border: 2px solid ${(props) => (props.isOn ? "white" : "black")};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const Icon = styled.span`
  font-size: 16px;
  margin: 0;
  display: inline-block;
  text-align: center;
  width: 20px;
  height: 20px;
`;

const App = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const [activeTab, setActiveTab] = useState("Home");
  const [selectedRadio, setSelectedRadio] = useState("show");
  const [searchQuery, setSearchQuery] = useState("");

  const [showData, setShowData] = useState([]);
  const [actorData, setActorData] = useState([]);

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShowSearch();
  }, []);

  const handleSearchButtonClick = () => {
    // Trigger the search when the search button is clicked
    handleShowSearch();
  };
  return (
    <Main>
      <PageContainer isOn={isOn}>
        <ToggleContainer onClick={toggleSwitch}>
          <ToggleSlider isOn={isOn}>
            <Icon role="img" aria-label={isOn ? "Sun" : "Moon"}>
              {isOn ? "🌞" : "🌜"}
            </Icon>
          </ToggleSlider>
        </ToggleContainer>
        <Header
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
          handleRadioChange={handleRadioChange}
          selectedRadio={selectedRadio}
          // showData={showData}
          filteredActorData={actorData}
          filteredData={showData}
          searchQuery={searchQuery}
          handleInputChange={handleInputChange}
          isOn={isOn}
          handleSearchButtonClick={handleSearchButtonClick}
        />
      </PageContainer>
    </Main>
  );
};

export default App;
