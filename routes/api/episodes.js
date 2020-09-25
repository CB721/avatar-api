const router = require("express").Router();
const controller = require("../../controllers/episodesController");

router
    .route("/all/:page")
    .get(controller.all);
router
    .route("/one/:id?")
    .get(controller.one);

module.exports = router;