const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/matchList", (req, res) => {
  axios
    .get(
      `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.body.accountId}?endIndex=${req.body.count}&api_key=${process.env.DEVELOPMENT_KEY}`
    )
    .then((response) => {
      res.status(200).json({
        matchData: response.data
      });
    })
    .catch((error) => {
      return res.json({ success: false, error });
    });
});

router.post("/matchDetail", (req, res) => {
  axios
    .get(
      `https://kr.api.riotgames.com/lol/match/v4/matches/${req.body.gameId}?api_key=${process.env.DEVELOPMENT_KEY}`
    )
    .then((response) => {
      res.status(200).json({
        matchData: response.data
      });
    })
    .catch((error) => {
      return res.json({ success: false, error });
    });
});

router.post("/matchData", async (req, res) => {
  const matchList = await axios
    .get(
      `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.body.accountId}?endIndex=${req.body.count}&api_key=${process.env.DEVELOPMENT_KEY}`
    )
    .then((response) => {
      return response.data.matches;
    });

  const getMatchDetail = (list) => {
    const result = Promise.all(
      list.map((match) => {
        return axios
          .get(
            `https://kr.api.riotgames.com/lol/match/v4/matches/${match.gameId}?api_key=${process.env.DEVELOPMENT_KEY}`
          )
          .then((response) => {
            return response.data;
          });
      })
    );
    return result;
  };
  getMatchDetail(matchList).then((response) => {});
});

module.exports = router;
