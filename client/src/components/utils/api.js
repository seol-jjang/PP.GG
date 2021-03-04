import axios from "axios";

export const getSummonerInfo = (nickname) => {
  const body = {
    nickname: encodeURI(nickname)
  };
  return axios.post("/ppgg/summoners/summonerInfo", body);
};

export const getSummonerRank = (summonerId) => {
  const body = {
    summonerId: summonerId
  };
  return axios.post("/ppgg/summoners/summonerRank", body);
};

export const getMatchData = (accountId, count) => {
  const body = {
    accountId: accountId,
    count: count
  };
  return axios.post("/ppgg/matches/matchData", body);
};

export const getChampionData = () => {
  return axios.get(
    "http://ddragon.leagueoflegends.com/cdn/11.5.1/data/en_US/champion.json"
  );
};
