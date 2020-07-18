const router = require("express").Router();
const controller = require("../../controllers/charactersController");

router
    .route("/all/:element?")
    .get(controller.all);
router
    .route("/one/:id?")
    .get(controller.one);

module.exports = router;