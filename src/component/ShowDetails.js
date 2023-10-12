import React from "react";
import { useNavigate } from "react-router-dom";
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

const ShowDetails = ({ showData, isOn, handleFavouriteButtonClick }) => {
  // const navigate=useNavigate()
  // const handleShowFullDetails=(item)=>{
  //   console.log(item,"jdgfdjfg")
  //   let showid=item.show.id
  //   navigate(`/showfullpage/${showid}`)
  // }
  const navigate = useNavigate();

  const handleShowFullDetails = (item) => {
    console.log(item,"hello")
    navigate(`/showfullpage/${item.show.id}`);
  }


  return (
    <ParentCard isOn={isOn}>
      {showData.map((item) => (
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
          <button onClick={() => handleShowFullDetails(item)} className="read-more-button">Read More</button>
           
        
            {/* <Link to={`/showfullpage/${item?.show?.id}`}>Read More</Link>             */}
            <button
              className="star-button"
              onClick={() => handleFavouriteButtonClick(item)}
            >
              &#9734;
            </button>
          </div>
        </div>
      ))}
    </ParentCard>
  );
};

export default ShowDetails;
