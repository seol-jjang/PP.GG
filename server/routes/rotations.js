const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Rotation } = require("../models/Rotation");

router.get("/championRotations", (req, res) => {
  const getChampionIds = () => {
    axios
      .get(
        `https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${process.env.DEVELOPMENT_KEY}`
      )
      .then(async (response) => {
        const date = Date.now();
        const day = new Date();
        const rotation = new Rotation({
          rotationList: response.data.freeChampionIds,
          updateDate: date,
          updateDay: day.getDay()
        });
        rotation.save((err, doc) => {});
        return res.status(200).json({
          rotationList: response.data.freeChampionIds
        });
      });
  };
  Rotation.find((err, data) => {
    if (data.length > 0) {
      const toDay = new Date();
      const date = Date.now();
      const updateDate = data[data.length - 1].updateDay;
      const updateTime = Math.round(
        (date - data[data.length - 1].updateDate) / 1000 / 60 / 60 / 24
      );
      if (toDay.getDay() === 2) {
        if (updateDate === 2 && updateTime < 1) {
          return res.json({
            rotationList: data[data.length - 1].rotationList
          });
        } else {
          getChampionIds();
        }
        // if (updateDate === 2) {
        //   if (updateTime <= 0) {
        //     return res.json({
        //       rotationList: data[data.length - 1].rotationList
        //     });
        //   } else {
        //     getChampionIds();
        //   }
        // } else {
        //   getChampionIds();
        // }
      } else {
        if (updateTime <= 6) {
          return res.json({
            rotationList: data[data.length - 1].rotationList
          });
        } else {
          getChampionIds();
        }
      }
    } else {
      getChampionIds();
    }
  });
});

module.exports = router;
