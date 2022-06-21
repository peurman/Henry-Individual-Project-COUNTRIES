const { Router } = require("express");
const { getCountries, getCountryxID } = require("../controllers/Country");

const router = Router();

// RUTAS DE COUNTRY
router.get("/:id", getCountryxID); //ruta que filtra id de pais

router.get("/", getCountries); // ruta genérica con params y query opcionales

module.exports = router;
