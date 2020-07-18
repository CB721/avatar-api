const router = require("express").Router();
const controller = require("../../controllers/quotesController");

router
    .route("/all/:charid?/:episodeid?/:season?")
    .get(controller.all);

module.exports = router;