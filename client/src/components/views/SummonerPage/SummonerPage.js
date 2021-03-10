import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { asyncUtil } from "../../utils/asyncUtil";
import { getTimeStamp } from "../../utils/gameUtil";
import {
  getSummonerInfo,
  getSummonerRank,
  getMatchData,
  getRefreshSummoner,
  getRefreshRank,
  getMoreMatchData
} from "../../utils/api";
import RankInfo from "./RankInfo";
import "../../../styles/summonerPage/summoner.scss";
import MatchList from "./matchList/MatchList";

const SummonerPage = () => {
  const [summonerInfo, setSummonerInfo] = useState(null);
  const [summonerRank, setSummonerRank] = useState(null);
  const [matchData, setMatchData] = useState([]);
  const [isCancelled, setIsCancelled] = useState(false);
  const [updateDate, setUpdateDate] = useState(null);
  const param = useParams();

  useEffect(() => {
    const nickname = param.nickname.replace(/\+/g, " ");

    if (!isCancelled) {
      getSummonerInfo(nickname).then(async (response) => {
        if (response.data.user) {
          setSummonerInfo(response.data.user);
          setUpdateDate(response.data.updateDate);
          console.log(response.data);
          const { accountId, id } = response.data.user;
          const count = {
            min: 0,
            max: 10
          };
          Promise.all([
            await asyncUtil(getSummonerRank(id), 1000),
            await asyncUtil(getMatchData(accountId, count), 1000)
          ]).then(([summonerRankData, matchDetailData]) => {
            setMatchData(matchDetailData.data.matchData);
            setSummonerRank(summonerRankData.data.rankData);
            setIsCancelled(true);
          });
        } else {
          setIsCancelled(true);
        }
      });
    }
    return () => {
      setIsCancelled(true);
    };
  }, [isCancelled, param.nickname]);

  const refreshHandle = () => {
    const time = Date.now() - updateDate;
    const hours = Math.floor(time / 1000 / 60 / 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor(((time / 1000) % 60) % 60);
    if (hours <= 0 && minutes <= 5) {
      const convertSeconds = minutes * 60 + seconds;
      console.log(convertSeconds);
      alert(
        `${convertSeconds}초 전에 갱신했습니다. ${
          300 - convertSeconds
        }초 후에 다시 갱신하실 수 있습니다.`
      );
    } else {
      const nickname = param.nickname.replace(/\+/g, " ");
      getRefreshSummoner(nickname).then(async (response) => {
        const count = {
          min: 0,
          max: 10
        };
        setSummonerInfo(response.data.user);
        Promise.all([
          await asyncUtil(getRefreshRank(summonerInfo.id), 1000),
          await asyncUtil(getMoreMatchData(summonerInfo.accountId, count), 1000)
        ]).then(([summonerRankData, matchDetailData]) => {
          setMatchData(matchDetailData.data.matchData);
          setSummonerRank(summonerRankData.data.rankData);
          setUpdateDate(response.data.updateDate);
        });
      });
    }
  };

  if (!isCancelled) {
    return <section></section>;
  }
  if (summonerInfo !== null) {
    return (
      <article className="article">
        <header className="summoner-info">
          <section>
            <div className="summoner__level">
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/${summonerInfo.profileIconId}.png`}
                alt="profileIcon"
              />
              <span>{summonerInfo.summonerLevel}</span>
            </div>
            <div className="summoner__name">
              <h2>{summonerInfo.name}</h2>
              <p>{getTimeStamp(updateDate)}</p>
              <button className="refresh-btn" onClick={refreshHandle}>
                전적 갱신
              </button>
            </div>
          </section>
          <RankInfo summonerRank={summonerRank} />
        </header>
        <div className="detail-contents">
          <section className="info-contents"></section>
          <section className="match-contents">
            <MatchList
              matchData={matchData}
              accountId={summonerInfo.accountId}
            />
          </section>
        </div>
      </article>
    );
  } else {
    return <section>일치하는 소환사가 없습니다...</section>;
  }
};

export default SummonerPage;
