const { Router } = require("express");
const { getActivities, postActivity } = require("../controllers/Activity");

const router = Router();

router.get("/", getActivities);
router.post("/", postActivity);

module.exports = router;
