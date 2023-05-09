const express = require("express");
const { githubApi } = require("../controllers/githubController");

const githubRouter = express.Router();

githubRouter.route("/").post(githubApi);

module.exports = githubRouter;
