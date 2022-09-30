const { Router } = require("express");
const bodyParser = require("body-parser");

const Country = require("./Country.js");
const Activity = require("./Activity.js");

const router = Router();

router.use(bodyParser.json());

router.use("/countries", Country);
router.use("/activities", Activity);

module.exports = router;
