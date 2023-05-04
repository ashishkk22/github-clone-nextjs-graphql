const express = require("express");
const { githubApi } = require("../controllers/githubRouter");

const githubRouter = express.Router();

githubRouter.route("/").post(githubApi);

module.exports = githubRouter;
