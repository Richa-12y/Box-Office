import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";

const ParentCard = styled.div`
  background-color: ${(props) => (props.isOn ? "#ffffff" : "#000000")};
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 50px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const ShowFullDetails = ({ isOn }) => {
  const { id } = useParams();
  // console.log("ID from URL:", id); // Log the ID from the URL

  const [show, setShow] = useState(null);

  const fetchShowDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/shows/${id}?embed[]=episodes&embed[]=cast`
      );
      setShow(response.data);
      console.log(response.data, "nbvv"); // Check the data in the console
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchShowDetails();
  }, [id]);

  if (!show) {
    return <div className="loading">⏳Loading...</div>;
  }

  const linkStyle = {
    textDecoration: "none",
    color: "blue",
  };

  return (
    <ParentCard isOn={isOn}>
      <div className="full-details-card">
        <button className="button-back">
          <Link to="/" style={linkStyle}>
            Back
          </Link>
        </button>
        <div>
          <div className="upper-card-container">
            <div>
              <img src={show.image?.medium} alt={show.name}  width={300} style={{borderTopLeftRadius:"15px",borderBottomRightRadius:"15px"}}/>
            </div>
            <div>
              <h1>Name: {show.name || "Not available"}</h1>
              <p>
                Genres: {show.genres ? show.genres.join(", ") : "Not available"}
              </p>
              <p>
                Rating:{" "}
                {show.rating && show.rating.average
                  ? show.rating.average
                  : "Not available"}
              </p>
              <p>Language: {show.language || "Not available"}</p>
              <p>Status: {show.status || "Not available"}</p>
            </div>
          </div>
          <div className="text-container">
            <div style={{display:"flex",justifyContent:"flexStart",marginTop:"10px"}}>
              Description:
              <p style={{marginTop:"16px"}}
                dangerouslySetInnerHTML={{
                  __html: show.summary || "Not avilable",
                }}
              />
            </div>
            <p>Premiered: {show.premiered || "Not available"}</p>
            <p>Ended: {show.ended || "Not available"}</p>
            <p>
              Days:{" "}
              {show.schedule ? show.schedule.days.join(", ") : "Not available"}
            </p>
            <p>
              Web Channel:{" "}
              {show.webChannel ? show.webChannel.name : "Not available"}
            </p>
            <p>
              Country:{" "}
              {show.webChannel && show.webChannel.country
                ? show.webChannel.country.name
                : "Not available"}
            </p>
            
          </div>

          
        </div>
      </div>
    </ParentCard>
  );
};

export default ShowFullDetails;
