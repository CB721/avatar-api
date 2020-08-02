const router = require("express").Router();
const controller = require("../../controllers/docsController");

router
    .route("/characters")
    .get(controller.characters);
router
    .route("/elements")
    .get(controller.elements);
router
    .route("/episodes")
    .get(controller.episodes);
router
    .route("/quotes")
    .get(controller.quotes);
router
    .route("/seasons")
    .get(controller.seasons);
router
    .route("/all")
    .get(controller.all);

module.exports = router;