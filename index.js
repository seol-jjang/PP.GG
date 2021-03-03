const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const port = 5000;

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/ppgg/summoners", require("./routes/summoners"));
app.use("/ppgg/matches", require("./routes/matches"));

app.listen(5000, () => {
  console.log(`Server Running.. ${port}`);
});
