const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/summonerInfo", (req, res) => {
  axios
    .get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.body.nickname}?api_key=${process.env.DEVELOPMENT_KEY}`
    )
    .then((response) => {
      res.status(200).json({
        user: response.data
      });
    })
    .catch((error) => {
      if (error.response.status === 404) {
        res.status(200).json({
          user: null
        });
      }
    });
});

router.post("/summonerRank", (req, res) => {
  axios
    .get(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.body.summonerId}?api_key=${process.env.DEVELOPMENT_KEY}`
    )
    .then((response) => {
      res.status(200).json({
        rankData: response.data
      });
    })
    .catch((error) => {
      return res.json({ success: false, error });
    });
});

module.exports = router;