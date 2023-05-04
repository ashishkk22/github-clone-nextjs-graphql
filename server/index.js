const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const mongoose = require("mongoose");
const { authMiddleware } = require("./middlewares/authMiddleware");
const githubRouter = require("./routers/githubRouter");

require("dotenv").config();
const corsOptions = {
  origin: process.env.CLIENT_LINK,
  credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());

const db_link = process.env.DB_LINK;

mongoose
  .connect(db_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function (db) {
    console.log("db is connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Listening on port `" + PORT + "`");
});

app.get("/", (req, res) => {
  res.send("Hi running !");
});

app.use("/user", authRouter);
app.use("/graphql", authMiddleware, githubRouter);
// app.use("/compile", authMiddleware, compileRouter);
// app.use("/user", authRouter);

// app.use("/user");
