import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ChampionIcon from "../../common/championIcon/ChampionIcon";

const Participants = ({ participantIdentities, participants }) => {
  const history = useHistory();
  const [firstTeam, setFirstTeam] = useState([]);
  const [secondTeam, setSecondTeam] = useState([]);

  useEffect(() => {
    participantIdentities.map((participant, index) => {
      if (index <= 4) {
        return setFirstTeam((name) => [
          ...name,
          participant.player.summonerName
        ]);
      }
      return setSecondTeam((name) => [
        ...name,
        participant.player.summonerName
      ]);
    });
  }, []);

  const onClickHandle = (name) => {
    const nickname = name.replace(/ /g, "+");
    window.open(`/summoner/${nickname}`);
  };

  return (
    <>
      {firstTeam.length !== 0 && secondTeam.length !== 0 && (
        <>
          <ul className="summonerlist">
            {firstTeam.map((name, index) => {
              return (
                <li className="summoner" key={index}>
                  <ChampionIcon championId={participants[index].championId} />
                  <p className="name" onClick={() => onClickHandle(name)}>
                    {name}
                  </p>
                </li>
              );
            })}
          </ul>
          <ul className="summonerlist">
            {secondTeam.map((name, index) => {
              return (
                <li className="summoner" key={index}>
                  <ChampionIcon
                    championId={participants[index + 5].championId}
                  />
                  <p className="name" onClick={() => onClickHandle(name)}>
                    {name}
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default Participants;
