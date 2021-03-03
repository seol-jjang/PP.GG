import axios from "axios";
import React, { useEffect, useState } from "react";
import RankEmblem from "../../utils/RankEmblem";

function SummonerRank({ summonerId }) {
  const QUEUE_TYPE = "RANKED_SOLO_5x5";
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
            if (current.queueType === QUEUE_TYPE) {
              return current;
            } else {
              return acc;
            }
          });
          if (rank.queueType === QUEUE_TYPE) {
            setRankData(rank);
          } else {
            setRankData(null);
          }
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
          <RankEmblem tier={rankData.tier} />
          <div className="rank-info">
            <div>
              <span>솔로랭크</span>
            </div>
            <div>
              <span className="league-point">{rankData.leaguePoints}LP</span>
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
          <RankEmblem tier="unrank" />
          <div className="rank-info">
            <span>솔로랭크</span>
            <p className="tier-title unrank">Unrank</p>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="summoner__rank">
        <RankEmblem tier="unrank" />
        <div className="rank-info">
          <span>솔로랭크</span>
          <p className="tier-title unrank">Unrank</p>
        </div>
      </div>
    );
  }
}

export default SummonerRank;
