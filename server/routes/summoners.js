const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Summoner } = require("../models/Summoner");
const { Rank } = require("../models/Rank");

router.post("/summonerInfo", (req, res) => {
  const updateSummonerInfo = (newData) => {
    axios
      .get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
          req.body.nickname
        )}?api_key=${process.env.DEVELOPMENT_KEY}`
      )
      .then((response) => {
        const date = Date.now();
        if (newData) {
          const newSummonerData = {
            name: response.data.name,
            summonerData: response.data,
            updateDate: date
          };
          Summoner.findOneAndReplace(
            { name: { $regex: req.body.nickname, $options: "i" } },
            newSummonerData,
            { returnNewDocument: true }
          ).then((response) => {
            return res.status(200).json({
              user: response.summonerData,
              updateDate: response.updateDate
            });
          });
        }
        const summoner = new Summoner({
          name: response.data.name,
          summonerData: response.data,
          updateDate: date
        });
        summoner.save((err, doc) => {
          return res.status(200).json({
            user: response.data,
            updateDate: date
          });
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
      let newData;
      if (data) {
        newData = true;
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
          updateSummonerInfo(newData);
        }
      } else {
        newData = false;
        updateSummonerInfo(newData);
      }
    }
  );
});

router.post("/summonerRank", (req, res) => {
  const updateRankData = (newData) => {
    axios
      .get(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.body.summonerId}?api_key=${process.env.DEVELOPMENT_KEY}`
      )
      .then((response) => {
        const resultData = Object.values(response.data).find(
          (rankType) => rankType.queueType === "RANKED_SOLO_5x5"
        );
        const date = Date.now();
        if (newData) {
          const newRankData = {
            summonerId: req.body.summonerId,
            rankData: resultData,
            updateDate: date
          };
          Rank.findOneAndReplace(
            { summonerId: req.body.summonerId },
            newRankData,
            { returnNewDocument: true }
          ).then((response) => {
            return res.status(200).json({
              rankData: response.resultData,
              updateDate: response.date
            });
          });
        }
        const rank = new Rank({
          summonerId: req.body.summonerId,
          rankData: resultData,
          updateDate: date
        });
        rank.save((err, doc) => {
          return res.status(200).json({
            rankData: resultData,
            updateDate: date
          });
        });
      })
      .catch((error) => {
        return res.json({ success: false, error });
      });
  };

  Rank.findOne({ summonerId: req.body.summonerId }, (err, data) => {
    let newData;
    if (data) {
      newData = true;
      const date = Date.now();
      const updateTime = Math.floor(
        (date - data.updateDate) / 1000 / 60 / 60 / 24
      );
      console.log(updateTime);

      if (updateTime <= 1) {
        return res.status(200).json({
          rankData: data.rankData,
          updateDate: data.updateDate
        });
      } else {
        updateRankData(newData);
      }
    } else {
      newData = false;
      updateRankData(newData);
    }
  });
});

module.exports = router;
