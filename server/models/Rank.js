const mongoose = require("mongoose");

const rankSchema = mongoose.Schema({
  rankData: {
    type: Object
  },
  updateDate: {
    type: Number
  }
});

const Rank = mongoose.model("Rank", rankSchema);

module.exports = { Rank };
