import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import express from "express";

const cookieSession = require("cookie-session");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./route/auth");

let app = express();
require('dotenv').config();
let port = process.env.PORT;

app.use(
  cors({
    origin: process.env.URL_REACT,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
    cookieSession({ name: "session", keys: ["TAN"], maxAge: 24 * 60 * 60 * 100 })  
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/auth", authRoute);
viewEngine(app);
initWebRoutes(app);
connectDB();

app.listen(port, () => {
    console.log("Back-end đang chạy ở cổng: " + port);
})
