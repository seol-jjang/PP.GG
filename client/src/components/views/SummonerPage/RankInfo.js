import React from "react";

function RankInfo({ summonerRank }) {
  if (summonerRank) {
    return (
      <div className="summoner__rank">
        {/* <RankEmblem tier={summonerRank.tier} /> */}
        <div className="rank-info">
          <div>
            <span>솔로랭크</span>
          </div>
          <div>
            <span className="league-point">{summonerRank.leaguePoints}LP</span>
            <span>{summonerRank.wins}승</span>
            <span>{summonerRank.losses}패</span>
          </div>
          <p className="tier-title">{summonerRank.tier}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="summoner__rank">
        {/* <RankEmblem tier="unrank" /> */}
        <div className="rank-info">
          <span>솔로랭크</span>
          <p className="tier-title unrank">Unrank</p>
        </div>
      </div>
    );
  }
}

export default RankInfo;
