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
