const router = require("express").Router();
const characters = require("./characters");
const episodes = require("./episodes");
const seasons = require("./seasons");

router.use("/characters", characters);
router.use("/episodes", episodes);
router.use("/seasons", seasons);

module.exports = router;