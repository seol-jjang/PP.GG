const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Summoner } = require("../models/Summoner");
const { Rank } = require("../models/Rank");

router.post("/summonerInfo", (req, res) => {
  const updateSummonerInfo = () => {
    axios
      .get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
          req.body.nickname
        )}?api_key=${process.env.DEVELOPMENT_KEY}`
      )
      .then((response) => {
        const date = Date.now();
        const summoner = new Summoner({
          name: response.data.name,
          summonerData: response.data,
          updateDate: date
        });
        summoner.save((err, doc) => {});
        return res.status(200).json({
          user: response.data,
          updateDate: date
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          res.status(200).json({
            user: null
          });
        } else {
          console.log(error);
        }
      });
  };

  Summoner.findOne(
    { name: { $regex: req.body.nickname, $options: "i" } },
    (err, data) => {
      if (data) {
        const date = Date.now();
        const updateTime = Math.floor(
          (date - data.updateDate) / 1000 / 60 / 60 / 24
        );

        if (updateTime <= 1) {
          return res.status(200).json({
            user: data.summonerData,
            updateDate: data.updateDate
          });
        } else {
          updateSummonerInfo();
        }
      } else {
        updateSummonerInfo();
      }
    }
  );
});

router.post("/summonerRank", (req, res) => {
  const updateRankData = () => {
    axios
      .get(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.body.summonerId}?api_key=${process.env.DEVELOPMENT_KEY}`
      )
      .then((response) => {
        const resultData = Object.values(response.data).find(
          (rankType) => rankType.queueType === "RANKED_SOLO_5x5"
        );
        const date = Date.now();
        const rank = new Rank({
          summonerId: req.body.summonerId,
          rankData: resultData,
          updateDate: date
        });
        rank.save((err, doc) => {});
        return res.status(200).json({
          rankData: resultData,
          updateDate: date
        });
      })
      .catch((error) => {
        return res.json({ success: false, error });
      });
  };

  Rank.findOne({ summonerId: req.body.summonerId }, (err, data) => {
    if (data) {
      const date = Date.now();
      const updateTime = Math.floor(
        (date - data.updateDate) / 1000 / 60 / 60 / 24
      );

      if (updateTime <= 1) {
        return res.status(200).json({
          rankData: data.rankData,
          updateDate: data.updateDate
        });
      } else {
        updateRankData();
      }
    } else {
      updateRankData();
    }
  });
});

module.exports = router;
