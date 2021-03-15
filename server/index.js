const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const config = require("./config/key");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/ppgg/summoners", require("./routes/summoners"));
app.use("/ppgg/matches", require("./routes/matches"));
app.use("/ppgg/rotations", require("./routes/rotations"));

app.listen(5000, () => {
  console.log(`Server Running.. ${port}`);
});
