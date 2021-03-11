import React, { useEffect, useState } from "react";
import { getKDARatio } from "../../utils/gameUtil";

const MatchAvgData = ({ matchData, count }) => {
  const [winCount, setWinCount] = useState(null);
  const [kdaCount, setKdaCount] = useState(null);

  useEffect(() => {
    if (matchData) {
      setWinCount(
        matchData.reduce((acc, current) => {
          if (current.win) {
            return acc + 1;
          }
          return acc;
        }, 0)
      );
      const kills = matchData.reduce(
        (acc, current) => {
          return {
            kills: acc.kills + current.participant.stats.kills,
            deaths: acc.deaths + current.participant.stats.deaths,
            assists: acc.assists + current.participant.stats.assists
          };
        },
        { kills: 0, deaths: 0, assists: 0 }
      );
      setKdaCount(kills);
    }
  }, [matchData]);

  const renderRate = matchData.map((match, index) => {
    if (match.win) {
      return (
        <li
          className="rate-win"
          key={index}
          style={{ width: 180 / count.max }}
        ></li>
      );
    }
  });

  return (
    <>
      {winCount && kdaCount && (
        <div className="rate">
          <div className="rate__winning">
            <p>
              {count.max}전 {winCount}승 {count.max - winCount}패
            </p>
            <p className="winning-rate">{(winCount / count.max) * 100}%</p>
          </div>
          <ul className="rate__bar">{renderRate}</ul>
          <div className="lately-kda">
            <p>
              <span>{(kdaCount.kills / count.max).toFixed(1)}</span> /
              <span className="death">
                {" "}
                {(kdaCount.deaths / count.max).toFixed(1)}
              </span>{" "}
              / <span>{(kdaCount.assists / count.max).toFixed(1)}</span>
            </p>
            <p className="kda">
              {getKDARatio(kdaCount.kills, kdaCount.deaths, kdaCount.assists)}
            </p>
          </div>
        </div>
      )}
      {console.log(matchData)}
    </>
  );
};

export default MatchAvgData;
