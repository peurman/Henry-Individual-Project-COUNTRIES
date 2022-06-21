const { Router } = require("express");
const { getActivities, postActivity } = require("../controllers/Activity");

const router = Router();

//RUTAS DE ACTIVITY
router.get("/", getActivities); //muestro todas las actividades

router.post("/", postActivity); //genero actividad nueva

module.exports = router;
