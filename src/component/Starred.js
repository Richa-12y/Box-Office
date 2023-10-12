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

const Starred = ({ starredShows,removeFromStarred,isOn }) => {
  console.log(removeFromStarred, "hello");
  return (
    <ParentCard isOn={isOn}>
      {starredShows.map((item) => (
        <div key={item.show.id} className="card-them">
          <div
            className="image-container"
            style={{ backgroundImage: `url(${item?.show?.image?.medium})` }}
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
                {console.log(item.show.summary,"summ")}
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
            <button
              className="star-button"
             onClick={()=>removeFromStarred(item)}
            >
             ✂
            </button>
          </div>
        </div>
      ))}
    </ParentCard>
  );
};

export default Starred;
