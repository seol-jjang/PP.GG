import axios from "axios";
import React, { useEffect, useState } from "react";
import RankEmblem from "../../utils/RankEmblem";

function SummonerRank({ summonerId }) {
  const [textcolor, setTextColor] = useState("#2b2b2b");
  const [isCancelled, setIsCancelled] = useState(false);
  const [rankData, setRankData] = useState(null);

  useEffect(() => {
    const body = {
      id: summonerId
    };
    if (!isCancelled) {
      axios.post("/ppgg/summoners/summonerRank", body).then((response) => {
        if (response.data.rankData.length === 0) {
          setRankData(null);
        } else {
          const rank = response.data.rankData.reduce((acc, current) => {
            if (current.queueType === "RANKED_SOLO_5x5") {
              return current;
            } else {
              return acc;
            }
          });
          setRankData(rank);
        }
        setIsCancelled(true);
      });
    }
    return () => {
      setIsCancelled(true);
    };
  }, [isCancelled, summonerId]);

  if (isCancelled) {
    if (rankData !== null) {
      return (
        <div className="summoner__rank">
          {console.log(rankData)}
          <RankEmblem tier={rankData.tier} setTextColor={setTextColor} />
          <div className="rank-info">
            <div>
              <span>솔로랭크</span>
              <span className="league-point">{rankData.leaguePoints}LP</span>
            </div>
            <div>
              <span>{rankData.wins}승</span>
              <span>{rankData.losses}패</span>
            </div>
            <p className="tier-title" style={{ color: `${textcolor}` }}>
              {rankData.tier}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="summoner__rank">
          <RankEmblem tier="unrank" setTextColor={setTextColor} />
          <div className="rank-info">
            <span>솔로랭크</span>
            <p className="tier-title unrank">Unrank</p>
          </div>
        </div>
      );
    }
  } else {
    return <section></section>;
  }
}

export default SummonerRank;
