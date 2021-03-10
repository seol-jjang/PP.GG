const mongoose = require("mongoose");

const summonerSchema = mongoose.Schema({
  name: {
    type: String
  },
  summonerData: {
    type: Object
  },
  updateDate: {
    type: Number
  }
});

const Summoner = mongoose.model("Summoner", summonerSchema);

module.exports = { Summoner };
