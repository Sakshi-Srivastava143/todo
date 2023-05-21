const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router");
var flash = require("connect-flash");
var session = require("express-session");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(flash());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("assest"));

app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", router);

module.exports.startServer = async () => {
  try {
    await mongoose.connect(process.env.mongodbURL);
    app.listen(PORT, (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`${process.env.enviroment} server start at PORT ${PORT}`);
    });
  } catch (error) {
    console.log("error");
  }
};
