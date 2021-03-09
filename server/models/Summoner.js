const mongoose = require("mongoose");

const summonerSchema = mongoose.Schema({
  summonerData: {
    type: Object
  },
  updateDate: {
    type: Number
  }
});

const Summoner = mongoose.model("Summoner", summonerSchema);

module.exports = { Summoner };

// accountId: {
//   type: String
// },
// id: {
//   type: String
// },
// name: {
//   type: String
// },
// profileIconId: {
//   type: Number
// },
// puuid: {
//   type: String
// },
// revisionDate: {
//   type: Number
// },
// summonerLevel: {
//   type: Number
// },
