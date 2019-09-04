const router = require("express").Router();
const freebiesController = require("../Controllers/freebiesController");

router.route("/freebies").get(freebiesController.loadall);
router.route("/freebies/save").post(freebiesController.save);
module.exports = router;
