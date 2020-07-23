const router = require("express").Router();
const controller = require("../../controllers/quotesController");

router
    .route("/all/:charid?/:episodeid?/:season?")
    .post(controller.all);

module.exports = router;