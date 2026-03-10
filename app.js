const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const indexRouter = require("./routes/indexRouter");
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.use("/", indexRouter)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on Port: ${PORT}`);
});