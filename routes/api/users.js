const router = require("express").Router();
const controller = require("../../controllers/usersController");

router
    .route("/create")
    .post(controller.create);
router
    .route("/update/:id?")
    .patch(controller.update);
router
    .route("/remove")
    .delete(controller.delete);

module.exports = router;