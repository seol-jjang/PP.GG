import axios from "axios";

export const getRefreshSummoner = (nickname) => {
  const body = {
    nickname: nickname
  };
  return axios.post("/ppgg/refresh/refreshSummoner", body);
};
export const getRefreshRank = (summonerId) => {
  const body = {
    summonerId: summonerId
  };
  return axios.post("/ppgg/refresh/refreshRank", body);
};

export const getRefreshMatchData = (accountId, count) => {
  const body = {
    accountId: accountId,
    count: count
  };
  return axios.post("/ppgg/refresh/refreshMatchData", body);
};

export const getSummonerInfo = (nickname) => {
  const body = {
    nickname: nickname
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

export const getMoreMatchData = (accountId, count) => {
  const body = {
    accountId: accountId,
    count: count
  };
  return axios.post("/ppgg/matches/moreMatchData", body);
};

export const getChampionData = () => {
  return axios.get(
    "http://ddragon.leagueoflegends.com/cdn/11.5.1/data/en_US/champion.json"
  );
};

export const getSummonerSpell = () => {
  return axios.get(
    "http://ddragon.leagueoflegends.com/cdn/11.5.1/data/en_US/summoner.json"
  );
};

export const getItem = () => {
  return axios.get(
    "http://ddragon.leagueoflegends.com/cdn/11.5.1/data/en_US/item.json"
  );
};
