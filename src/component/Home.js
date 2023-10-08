import React from "react";
import styled from "styled-components";
const ParentCard = styled.div`
  background-color: ${(props) => (props.isOn ? "#ffffff" : "#000000")};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 50px;
  padding-bottom: 0px;
`;

const Home = ({ showData, isOn }) => {
  return (
    <ParentCard isOn={isOn}>
      {showData.map((item) => (
        <div key={item.show.id} className="card-them">
          <div
            className="image-container"
            style={{ backgroundImage: `url(${item.show.image.medium})` }}
          ></div>
          <strong>{item.show.name}</strong>
          {item.show.summary === null ? (
            <>
              <p className="summary">
                Girls is a metaphysical thriller, which follows a Chicago
                reporter who...
              </p>
            </>
          ) : (
            <>
              <p
                className="summary"
                dangerouslySetInnerHTML={{
                  __html: item.show.summary
                    ? `${item.show.summary.substring(0, 60)}${
                        item.show.summary.length > 16 ? "..." : ""
                      }`
                    : "",
                }}
              />
            </>
          )}
          <div className="card-footer">
            <a href={item.show.url}>Read More</a>
            <button className="star-button">&#9734;</button>
          </div>
        </div>
      ))}
    </ParentCard>
  );
};

export default Home;
