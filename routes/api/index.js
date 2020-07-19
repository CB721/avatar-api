const router = require("express").Router();
const characters = require("./characters");
const episodes = require("./episodes");
const seasons = require("./seasons");
const elements = require("./elements");
const quotes = require("./quotes");
const users = require("./users");

router.use("/characters", characters);
router.use("/episodes", episodes);
router.use("/seasons", seasons);
router.use("/elements", elements);
router.use("/quotes", quotes);
router.use("/users", users);

module.exports = router;