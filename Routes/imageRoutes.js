const router = require("express").Router();
const imageController = require("../Controllers/imageController");
// router.route("/images/").get(
//   //get images
//   path.join(__dirname, "./public/uploads")
//   fs.readdir()
// );

// router.route("/image/store").post(imageController.store);
router.route("/images").get(imageController.loadall);

module.exports = router;
