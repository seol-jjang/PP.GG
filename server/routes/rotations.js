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
        const rotation = new Rotation({
          rotationList: response.data.freeChampionIds,
          updateDate: date
        });
        rotation.save((err, doc) => {});
        return res.status(200).json({
          rotationList: response.data.freeChampionIds
        });
      });
  };
  Rotation.find((err, data) => {
    let newData;
    if (data.length > 0) {
      newData = true;
      const date = Date.now();
      const updateTime = Math.floor(
        (date - data[data.length - 1].updateDate) / 1000 / 60 / 60 / 24
      );
      if (updateTime <= 1) {
        return res.json({
          rotationList: data[data.length - 1].rotationList
        });
      } else {
        getChampionIds();
      }
    } else {
      getChampionIds();
    }
  });
});

module.exports = router;
