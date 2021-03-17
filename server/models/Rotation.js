const mongoose = require("mongoose");

const rotationSchema = mongoose.Schema({
  rotationList: {
    type: Array
  },
  updateDate: {
    type: Number
  },
  updateDay: {
    type: Number
  }
});

const Rotation = mongoose.model("Rotation", rotationSchema);

module.exports = { Rotation };
