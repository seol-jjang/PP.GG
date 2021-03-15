import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { asyncUtil } from "../../utils/asyncUtil";
import { getTimeStamp } from "../../utils/gameUtil";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  getSummonerInfo,
  getSummonerRank,
  getMatchData,
  getMoreMatchData
} from "../../utils/api";
import RankInfo from "./RankInfo";
import "../../../styles/summonerPage/summoner.scss";
import MatchList from "./matchList/MatchList";
import MatchAvgData from "./MatchAvgData";

const SummonerPage = () => {
  const btnRef = useRef();
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
    let mounted = true;
    const nickname = param.nickname.replace(/\+/g, " ");
    if (mounted) {
      getSummonerInfo(nickname, refresh).then(async (response) => {
        if (response.data.user) {
          setSummonerInfo(response.data.user);
          setUpdateDate(response.data.updateDate);
          const { accountId, id } = response.data.user;
          const count = {
            min: 0,
            max: 10
          };
          Promise.all([
            await asyncUtil(getSummonerRank(id, refresh), 1000),
            await asyncUtil(getMatchData(accountId, count, refresh), 1000)
          ]).then(([summonerRankData, matchDetailData]) => {
            setMatchData(matchDetailData.data.matchData);
            setSummonerRank(summonerRankData.data.rankData);
            setIsCancelled(true);
            setRefresh(false);
          });
        } else {
          setIsCancelled(true);
        }
      });
    }

    return () => {
      mounted = false;
    };
  }, [param.nickname, refresh]);

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
    }
  };

  const onMoreDataHandle = (e) => {
    const before =
      btnRef.current.getBoundingClientRect().top + window.pageYOffset;
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
      const after =
        btnRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollBy(0, before - after);
      setLoading(false);
    });
  };

  if (!isCancelled) {
    return <section></section>;
  }
  if (summonerInfo !== null) {
    return (
      <>
        <header></header>
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
            {!refresh && <RankInfo summonerRank={summonerRank} />}
          </header>
          <div className="detail-contents">
            {!refresh && (
              <>
                <section className="info-contents">
                  <MatchAvgData matchData={matchData} count={count} />
                </section>
                <section className="match-contents">
                  <MatchList matchData={matchData} />
                  {matchData.length >= 50 ? (
                    <button
                      className="more-btn"
                      onClick={onMoreDataHandle}
                      ref={btnRef}
                      disabled
                    ></button>
                  ) : (
                    <button
                      className="more-btn"
                      onClick={onMoreDataHandle}
                      ref={btnRef}
                    >
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
            )}
          </div>
        </article>
      </>
    );
  } else {
    return <section>일치하는 소환사가 없습니다...</section>;
  }
};

export default SummonerPage;
