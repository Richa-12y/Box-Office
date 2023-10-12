import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import Home from "./component/Home";
import { Route, Routes } from "react-router-dom";
import ShowFullDetails from "./component/ShowFullDetails";

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
        <Routes>
          <Route path="/" element={<Home isOn={isOn} />} />
          <Route
            exact
            path="/showfullpage/:id"
            element={<ShowFullDetails isOn={isOn} />}
          />
        </Routes>
      </PageContainer>
    </Main>
  );
};

export default App;
