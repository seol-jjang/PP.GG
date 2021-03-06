import React from "react";
import MatchItem from "./MatchItem";

const MatchList = ({ matchData, onMoreDataHandle }) => {
  return (
    <>
      <ul className="matchlist">
        {matchData &&
          matchData.map((match, index) => {
            return <MatchItem match={match} key={index} />;
          })}
        <button className="more-btn" onClick={onMoreDataHandle}>
          더보기
        </button>
      </ul>
    </>
  );
};

export default MatchList;
