const router = require("express").Router();
const imageController = require("../Controllers/imageController");
// router.route("/images/").get(
//   //get images
//   path.join(__dirname, "./public/uploads")
//   fs.readdir()
// );

// router.route("/image/store").post(imageController.store);
router.route("/images").get(imageController.loadall);

//delete route is on server.js
module.exports = router;
