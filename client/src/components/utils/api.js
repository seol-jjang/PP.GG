import axios from "axios";

export const getChampionRotations = () => {
  return axios.get("/ppgg/rotations/championRotations");
};

export const getSummonerInfo = (nickname, refresh) => {
  const body = {
    nickname: nickname,
    refresh: refresh
  };
  return axios.post("/ppgg/summoners/summonerInfo", body);
};

export const getSummonerRank = (summonerId, refresh) => {
  const body = {
    summonerId: summonerId,
    refresh: refresh
  };
  return axios.post("/ppgg/summoners/summonerRank", body);
};

export const getMatchData = (accountId, count, refresh) => {
  const body = {
    accountId: accountId,
    count: count,
    refresh: refresh
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
    "http://ddragon.leagueoflegends.com/cdn/11.5.1/data/ko_KR/champion.json"
  );
};

export const getSummonerSpell = () => {
  return axios.get(
    "http://ddragon.leagueoflegends.com/cdn/11.5.1/data/en_US/summoner.json"
  );
};

export const getItem = () => {
  return axios.get(
    "http://ddragon.leagueoflegends.com/cdn/11.5.1/data/ko_KR/item.json"
  );
};
