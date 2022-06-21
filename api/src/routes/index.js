const { Router } = require("express");
const bodyParser = require("body-parser");

const Country = require("./Country.js");
const Activity = require("./Activity.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(bodyParser.json());

//RUTAS de la SPA
router.use("/countries", Country);
router.use("/activities", Activity);

module.exports = router;
