const router = require("express").Router();
const controller = require("../../controllers/elementsController");

router
    .route("/all")
    .get(controller.all);

module.exports = router;