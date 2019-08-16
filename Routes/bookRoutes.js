const router = require("express").Router();
const bookController = require("../Controllers/bookController");

// router
//   .route('/blog/load')
//   .get(blogController.load);

router.route("/book/loadall").get(bookController.loadall);

router.route("/book/save").put(bookController.save);
router.route("/book/new").post(bookController.new);

module.exports = router;
