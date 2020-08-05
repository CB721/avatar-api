const router = require("express").Router();
const controller = require("../../controllers/usersController");

router
    .route("/create")
    .post(controller.create)
    .patch(controller.newKey);
router
    .route("/remove")
    .post(controller.delete);

module.exports = router;