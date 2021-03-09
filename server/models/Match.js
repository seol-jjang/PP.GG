const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
  accountId: { type: String },
  matchData: {
    type: Array
  },
  updateDate: {
    type: Number
  }
});

const Match = mongoose.model("Match", matchSchema);

module.exports = { Match };
