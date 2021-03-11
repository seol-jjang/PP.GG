import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { asyncUtil } from "../../utils/asyncUtil";
import { getTimeStamp } from "../../utils/gameUtil";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  getSummonerInfo,
  getSummonerRank,
  getMatchData,
  getRefreshSummoner,
  getRefreshRank,
  getRefreshMatchData,
  getMoreMatchData
} from "../../utils/api";
import RankInfo from "./RankInfo";
import "../../../styles/summonerPage/summoner.scss";
import MatchList from "./matchList/MatchList";
import MatchAvgData from "./MatchAvgData";

const SummonerPage = () => {
  const [summonerInfo, setSummonerInfo] = useState(null);
  const [summonerRank, setSummonerRank] = useState(null);
  const [matchData, setMatchData] = useState([]);
  const [updateDate, setUpdateDate] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState({
    min: 0,
    max: 10
  });

  const param = useParams();

  useEffect(() => {
    const nickname = param.nickname.replace(/\+/g, " ");

    if (!isCancelled) {
      getSummonerInfo(nickname).then(async (response) => {
        if (response.data.user) {
          setSummonerInfo(response.data.user);
          setUpdateDate(response.data.updateDate);
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
    const minutes = Math.floor(time / 1000 / 60);
    const seconds = Math.floor(((time / 1000) % 60) % 60);
    if (hours <= 0 && minutes <= 2) {
      const convertSeconds = minutes * 60 + seconds;
      alert(
        `${convertSeconds}초 전에 갱신했습니다. ${
          180 - convertSeconds
        }초 후에 다시 갱신하실 수 있습니다.`
      );
    } else {
      setRefresh(true);
      const nickname = param.nickname.replace(/\+/g, " ");
      getRefreshSummoner(nickname).then(async (response) => {
        const count = {
          min: 0,
          max: 10
        };
        setSummonerInfo(response.data.user);
        Promise.all([
          await asyncUtil(getRefreshRank(summonerInfo.id), 1000),
          await asyncUtil(
            getRefreshMatchData(summonerInfo.accountId, count),
            1000
          )
        ]).then(([summonerRankData, matchDetailData]) => {
          setRefresh(false);
          setMatchData(matchDetailData.data.matchData);
          setSummonerRank(summonerRankData.data.rankData);
          setUpdateDate(response.data.updateDate);
          window.location.reload();
        });
      });
    }
  };

  const onMoreDataHandle = () => {
    setLoading(true);
    const newCount = {
      min: count.min + 10,
      max: count.max + 10
    };
    setCount({
      min: count.min + 10,
      max: count.max + 10
    });
    Promise.all([
      asyncUtil(getMoreMatchData(summonerInfo.accountId, newCount), 1000)
    ]).then(([matchDetailData]) => {
      setMatchData((data) => data.concat(matchDetailData.data.matchData));
      setLoading(false);
    });
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
              <p className="refresh-time">
                마지막 업데이트: {getTimeStamp(updateDate)}
              </p>
              <button className="refresh-btn" onClick={refreshHandle}>
                {refresh ? (
                  <span>
                    <AiOutlineLoading3Quarters />
                  </span>
                ) : (
                  <>전적 갱신</>
                )}
              </button>
            </div>
          </section>
          <RankInfo summonerRank={summonerRank} />
        </header>
        <div className="detail-contents">
          <>
            <section className="info-contents">
              <MatchAvgData matchData={matchData} count={count} />
            </section>
            <section className="match-contents">
              <MatchList matchData={matchData} />
              {matchData.length >= 50 ? (
                <></>
              ) : (
                <button className="more-btn" onClick={onMoreDataHandle}>
                  {loading ? (
                    <span>
                      <AiOutlineLoading3Quarters />
                    </span>
                  ) : (
                    <>더보기</>
                  )}
                </button>
              )}
            </section>
          </>
        </div>
      </article>
    );
  } else {
    return <section>일치하는 소환사가 없습니다...</section>;
  }
};

export default SummonerPage;
