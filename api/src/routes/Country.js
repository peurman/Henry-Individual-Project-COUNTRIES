const { Router } = require("express");
const { getCountries, getCountryxID } = require("../controllers/Country");

const router = Router();

router.get("/:id", getCountryxID);
router.get("/", getCountries);

module.exports = router;
