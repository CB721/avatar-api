const router = require("express").Router();
const controller = require("../../controllers/seasonsController");

router
    .route("/all")
    .get(controller.all);
router
    .route("/one/:id?")
    .get(controller.one);

module.exports = router;