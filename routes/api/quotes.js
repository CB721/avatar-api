const router = require("express").Router();
const controller = require("../../controllers/quotesController");

router
// change route from all to sample
    .route("/sample/:charid?/:episodeid?/:season?")
    .get(controller.all);

module.exports = router;