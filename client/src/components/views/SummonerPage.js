import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/summonerPage/summoner.scss";

const summonerData = React.createContext(null);

function SummonerPage() {
  const [summoner, setSummoner] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const param = useParams();

  useEffect(() => {
    const nickname = param.nickname.replace(/\+/g, " ");
    const body = {
      nickname: encodeURI(nickname)
    };
    if (!isCancelled) {
      Axios.post("/ppgg/summoners/summonerInfo", body).then((response) => {
        setSummoner(response.data.user);
        setIsCancelled(true);
      });
    }
    return () => {
      setIsCancelled(true);
    };
  }, [isCancelled, param.nickname]);
  if (isCancelled) {
    if (summoner !== null) {
      return (
        <summonerData.Provider value={summoner}>
          <section className="section">
            {console.log(summoner)}
            <div className="user-container">
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/${summoner.profileIconId}.png`}
                alt="profileIcon"
              />
              <h2>{summoner.name}</h2>
            </div>
          </section>
        </summonerData.Provider>
      );
    } else {
      return (
        <summonerData.Provider value={summoner}>
          <section>일치하는 소환사가 없습니다...</section>
        </summonerData.Provider>
      );
    }
  } else {
    return <section></section>;
  }
}

export default SummonerPage;
