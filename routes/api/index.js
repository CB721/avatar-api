const router = require("express").Router();
const characters = require("./characters");
const episodes = require("./episodes");
const seasons = require("./seasons");
const elements = require("./elements");

router.use("/characters", characters);
router.use("/episodes", episodes);
router.use("/seasons", seasons);
router.use("/elements", elements);

module.exports = router;