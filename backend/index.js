const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const socketconfig = require("./config/socketconfig");
var cors = require("cors");
require("dotenv").config();
// routes
const notes = require("./routes/notes");
const auth = require("./routes/auth");
const enotes = require("./routes/encryptednotes");

const header_middleware = require("./middlewares/header");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
// Init Middleware
app.use(express.json({ extended: false }));
app.use(header_middleware);

app.get("/", (req, res) => res.send("Hello world!"));

// Routes
app.use("/api/auth", auth);
app.use("/api/notes", notes);
app.use("/api/encrypt/notes", enotes);

const port = process.env.PORT || 8082;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

socketconfig(server);
