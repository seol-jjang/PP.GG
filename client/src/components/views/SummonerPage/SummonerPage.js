import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { asyncUtil } from "../../utils/asyncUtil";
import { getSummonerInfo, getSummonerRank } from "../../utils/api";
import RankInfo from "./RankInfo";
import "../../../styles/summonerPage/summoner.scss";

function SummonerPage() {
  const QUEUE_TYPE = "RANKED_SOLO_5x5";
  const [summonerInfo, setSummonerInfo] = useState(null);
  const [summonerRank, setSummonerRank] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const param = useParams();

  useEffect(() => {
    const nickname = param.nickname.replace(/\+/g, " ");

    if (!isCancelled) {
      getSummonerInfo(nickname).then(async (response) => {
        setSummonerInfo(response.data.user);
        if (response.data) {
          const { accountId, id } = response.data.user;
          Promise.all([await asyncUtil(getSummonerRank(id), 1000)]).then(
            ([summonerRankData]) => {
              if (summonerRankData.data.rankData.length > 0) {
                const { rankData } = summonerRankData.data;
                const rank = Object.values(rankData).find(
                  (rankType) => rankType.queueType === QUEUE_TYPE
                );
                setSummonerRank(rank);
              }
              setIsCancelled(true);
            }
          );
        }
      });
    }
    return () => {
      setIsCancelled(true);
    };
  }, [isCancelled, param.nickname]);
  if (!isCancelled) {
    return <section></section>;
  }
  if (summonerInfo !== null) {
    return (
      <article className="article">
        <header className="summoner-info">
          <div className="summoner__level">
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/${summonerInfo.profileIconId}.png`}
              alt="profileIcon"
            />
            <span>{summonerInfo.summonerLevel}</span>
          </div>
          <div className="summoner__name">
            <h2>{summonerInfo.name}</h2>
            <button className="refresh-btn">전적 갱신</button>
          </div>
        </header>
        <div className="detail-contents">
          <section>
            <RankInfo summonerRank={summonerRank} />
          </section>
          <section></section>
        </div>
      </article>
    );
  } else {
    return <section>일치하는 소환사가 없습니다...</section>;
  }
}

export default SummonerPage;
