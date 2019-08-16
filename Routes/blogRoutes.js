const router = require("express").Router();
const blogController = require("../Controllers/blogController");

// router
//   .route('/blog/load')
//   .get(blogController.load);

router.route("/blog/loadall").get(blogController.loadall);

router.route("/blog/load/:title").get(blogController.load);
router.route("/blog/loadFour/:category").get(blogController.loadFour);

router.route("/blog/save").post(blogController.save);

router.route("/blog/views").post(blogController.updateViews);

router.route("/blog/new").post(blogController.new);

router.route("/blog/search/:search").get(blogController.search);

router.route("/blog/categorySearch/:search").get(blogController.categorySearch);
module.exports = router;
