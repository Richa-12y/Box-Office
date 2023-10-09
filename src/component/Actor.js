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

const Actor = ({ actorData, isOn }) => {
  if (!actorData || actorData.length === 0 || !actorData[0]?.person) {
    return <div>No data available</div>;
  }

  const person = actorData[0].person;

  return (
    <ParentCard isOn={isOn}>
      <div className="actor-card">
        {person.image?.medium ? (
          <img src={person.image.medium} alt="actor" width={300} height={230} />
        ) : (
          <img
            src="https://www.keycdn.com/img/support/image-processing-lg.webp"
            alt="Default"
            width={300}
          />
        )}
        <div className="actor-text">
          <strong>Name:{person.name}</strong>
          {person.country?.name && <div>Country: {person.country.name}</div>}
          {person.birthday && <div>Birthday: {person.birthday}</div>}
          {person.deathday ? <div>Deceased</div> : <div>Alive</div>}
          <div>Gender: {person.gender}</div>
        </div>
      </div>
    </ParentCard>
  );
};

export default Actor;
