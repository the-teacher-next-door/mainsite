const router = require("express").Router();
const passport = require("passport");
const commentsController = require("../Controllers/commentsController");

router.route("/comments/submit").put(commentsController.submit);
router.route("/comments/load/:id").get(commentsController.load);
router.route("/comments/loadReplies/:id").get(commentsController.loadReplies);

module.exports = router;
