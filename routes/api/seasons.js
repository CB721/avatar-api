const router = require("express").Router();
const controller = require("../../controllers/seasonsController");

router
    .route("/all/:id?")
    .get(controller.all);

module.exports = router;