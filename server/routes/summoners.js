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
              user: newSummonerData.summonerData,
              updateDate: date
            });
          });
        } else {
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
        }
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
      console.log(data);
      let newData;
      if (data) {
        newData = true;
        const date = Date.now();
        const updateTime = Math.floor(
          (date - data.updateDate) / 1000 / 60 / 60
        );

        if (req.body.refresh) {
          updateSummonerInfo(newData);
        } else {
          console.log("summoner: ", updateTime);
          if (updateTime > 48) {
            updateSummonerInfo(newData);
          } else {
            return res.status(200).json({
              user: data.summonerData,
              updateDate: data.updateDate
            });
          }
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
        const unrankData = {
          tier: "unrank"
        };
        const date = Date.now();
        if (newData) {
          const newRankData = {
            summonerId: req.body.summonerId,
            rankData: resultData !== undefined ? resultData : unrankData,
            updateDate: date
          };
          Rank.findOneAndReplace(
            { summonerId: req.body.summonerId },
            newRankData,
            { returnNewDocument: true }
          ).then((response) => {
            return res.status(200).json({
              rankData: newRankData.rankData,
              updateDate: date
            });
          });
        } else {
          const rank = new Rank({
            summonerId: req.body.summonerId,
            rankData: resultData !== undefined ? resultData : unrankData,
            updateDate: date
          });
          rank.save((err, doc) => {
            console.log("doc:", doc);
            return res.status(200).json({
              rankData: rank.rankData,
              updateDate: date
            });
          });
        }
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
      const updateTime = Math.floor((date - data.updateDate) / 1000 / 60 / 60);
      if (req.body.refresh) {
        updateRankData(newData);
      } else {
        console.log("rank: ", Math.round(updateTime / 24));
        if (updateTime > 48) {
          updateRankData(newData);
        } else {
          return res.status(200).json({
            rankData: data.rankData,
            updateDate: data.updateDate
          });
        }
      }
    } else {
      newData = false;
      updateRankData(newData);
    }
  });
});

module.exports = router;
