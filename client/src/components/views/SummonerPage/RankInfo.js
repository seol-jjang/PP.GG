import React, { useEffect, useState } from "react";
import { getRankEmblem } from "../../utils/gameUtil";

const RankInfo = ({ summonerRank }) => {
  const [emblemData, setEmblemData] = useState(null);
  const tier = ["MASTER", "GRANDMASTER", "CHALLENGER"];

  useEffect(() => {
    if (summonerRank) {
      setEmblemData(getRankEmblem(summonerRank.tier));
    }
  }, [summonerRank]);

  if (summonerRank && emblemData) {
    return (
      <div className="summoner__rank">
        <span className="emblem-img">
          <img src={emblemData.src} alt={summonerRank.tier} />
        </span>
        <div className="rank-info">
          <div>
            <span>솔로랭크</span>
          </div>
          <div>
            <span className="league-point">{summonerRank.leaguePoints} LP</span>
            <span>{summonerRank.wins}승</span>
            <span>{summonerRank.losses}패</span>
          </div>
          <p
            className="tier-title"
            style={{ color: `${emblemData.colorCode}` }}
          >
            {summonerRank.tier}
            {tier.indexOf(summonerRank.tier) < 0 ? ` ${summonerRank.rank}` : ""}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="summoner__rank">
        <span className="emblem-img">
          <img
            src="https://ppgg.s3.ap-northeast-2.amazonaws.com/tier-emblems/provisional.png"
            alt="unrank"
          />
        </span>
        <div className="rank-info">
          <span>솔로랭크</span>
          <p className="tier-title unrank">Unrank</p>
        </div>
      </div>
    );
  }
};

export default RankInfo;
