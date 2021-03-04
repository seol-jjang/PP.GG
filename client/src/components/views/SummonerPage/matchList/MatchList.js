import React from "react";
import {
  getGameDuration,
  getQueueType,
  getTimeStamp
} from "../../../utils/gameUtil";
import ChampionIcon from "./championIcon/ChampionIcon";

function MatchList({ matchData }) {
  return (
    <>
      {console.log(matchData)}
      <ul className="matchlist">
        {matchData &&
          matchData.map((match, index) => {
            return (
              <li
                key={index}
                className={`${
                  match.win ? "matchitem--win" : "matchitem--lose"
                }`}
              >
                <div className="time-record">
                  <p className="sub-text queue-type">
                    {getQueueType(match.queue)}
                  </p>
                  <p className="sub-text">{getTimeStamp(match.timestamp)}</p>
                  <p className={`match-result ${match.win ? "win" : "lose"}`}>
                    {match.win ? "승리" : "패배"}
                  </p>
                  <p className="sub-text">
                    {getGameDuration(match.gameDuration)}
                  </p>
                </div>
                <ChampionIcon championId={match.participant.championId} />
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default MatchList;
