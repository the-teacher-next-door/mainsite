const router = require("express").Router();
const sliderController = require("../Controllers/sliderController");

router.route("/slider/addLink").post(sliderController.addLink);
router.route("/slide/save").post(sliderController.save);
router.route("/slider/loadall").get(sliderController.loadall);

module.exports = router;
