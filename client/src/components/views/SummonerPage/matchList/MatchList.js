import React, { useEffect, useRef } from "react";
import MatchItem from "./MatchItem";

const MatchList = ({ matchData }) => {
  return (
    <>
      <ul className="matchlist">
        {matchData.length > 0 &&
          matchData.map((match, index) => {
            return (
              <li className="matchlist__game" key={index}>
                <MatchItem match={match} />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default MatchList;
