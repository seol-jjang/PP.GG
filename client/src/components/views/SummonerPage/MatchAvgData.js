import React, { useEffect, useState } from "react";
import { getKDARatio } from "../../utils/gameUtil";
import ChampionIcon from "../common/championIcon/ChampionIcon";
import ChampionName from "../common/championName/ChampionName";

const MatchAvgData = ({ matchData, count }) => {
  const [winCount, setWinCount] = useState(null);
  const [kdaCount, setKdaCount] = useState(null);
  const [champStats, setChampStats] = useState(null);

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

      const resultStats = matchData.reduce((acc, current) => {
        const { participant, win, timestamp } = current;
        if (acc[participant.championId]) {
          acc[participant.championId].matchCount += 1;
          acc[participant.championId].totalWin += win ? 1 : 0;
          acc[participant.championId].data.kills += participant.stats.kills;
          acc[participant.championId].data.deaths += participant.stats.deaths;
          acc[participant.championId].data.assists += participant.stats.assists;
          acc[participant.championId].winRate = Math.round(
            (acc[participant.championId].totalWin /
              acc[participant.championId].matchCount) *
              100
          );
          acc[participant.championId].kdaRatio = getKDARatio(
            acc[participant.championId].data.kills,
            acc[participant.championId].data.deaths,
            acc[participant.championId].data.assists
          );
        } else {
          const data = {
            matchCount: 1,
            totalWin: win ? 1 : 0,
            championId: participant.championId,
            timestamp: timestamp,
            kdaRatio: getKDARatio(
              participant.stats.kills,
              participant.stats.deaths,
              participant.stats.assists
            ),
            data: {
              kills: participant.stats.kills,
              deaths: participant.stats.deaths,
              assists: participant.stats.assists
            }
          };
          acc[participant.championId] = data;
          acc[participant.championId].winRate = Math.round(
            (acc[participant.championId].totalWin /
              acc[participant.championId].matchCount) *
              100
          );
        }
        return acc;
      }, []);
      resultStats.sort((a, b) => {
        if (a.matchCount === b.matchCount) {
          return b.kdaRatio - a.kdaRatio;
        } else {
          return b.matchCount - a.matchCount;
        }
      });
      setChampStats(resultStats);
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

  const renderChampionStats = () => {
    const sliceData = champStats.slice(0, 3);
    console.log(sliceData);
    return sliceData.map((champ, index) => {
      return (
        <li key={index}>
          <ChampionIcon championId={champ.championId} />
          <div className="stats">
            <ChampionName championId={champ.championId} />
            <div className="detail-stats">
              <p className="winning-rate">{champ.winRate}%</p>
              <p>
                {champ.totalWin}승 {champ.matchCount - champ.totalWin}패
              </p>
            </div>
            <p className="kda">{champ.kdaRatio} 평점</p>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      {winCount && kdaCount && (
        <>
          <div className="rate">
            <div className="rate__total">
              <p>
                {count.max}전 {winCount}승 {count.max - winCount}패
              </p>
              <p className="winning-rate">
                {Math.round((winCount / count.max) * 100)}%
              </p>
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
                {getKDARatio(kdaCount.kills, kdaCount.deaths, kdaCount.assists)}{" "}
                : 1
              </p>
            </div>
          </div>
          <ul className="champion-stats">{renderChampionStats()}</ul>
        </>
      )}
      {console.log(matchData)}
    </>
  );
};

export default MatchAvgData;
