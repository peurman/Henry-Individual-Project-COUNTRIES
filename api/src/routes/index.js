// Importo MODELOS de tablas desde la DB
const { Country, Activity, Country_Activity } = require("../db");
const { Op } = require("sequelize");

const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET COUNTRIES ID
router.get("/countries/:id", async (req, res) => {
  const { id } = req.params; // -> si me llega 1 pais x query
  const response = await Country.findByPk(id.toUpperCase(), {
    include: Activity,
  });
  if (!response) {
    return res
      .status(404)
      .send(`Id ${id} does not correspond to an existing country`);
  }
  res.status(201).json(response);
});

//GET COUNTRIES
router.get("/countries", async (req, res) => {
  const { name } = req.query; // -> si llega nombre de pais x query
  const { filter } = req.query; // -> si llega filtro
  if (name) {
    const response = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%", // -> si contiene name
        },
      },
    });
    if (response.length === 0) {
      return res
        .status(404)
        .send(`Name ${name} does not correspond to any existing country`);
    }
    res.status(201).json(response);
  } else if (filter) {
    const response = await Country.findAll({
      where: {
        [Op.or]: [
          {
            subregion: {
              [Op.iLike]: "%" + filter + "%", // -> si contiene filter
            },
          },
          {
            continent: {
              [Op.iLike]: "%" + filter + "%", // -> si contiene filter
            },
          },
        ],
      },
    });
    if (response.length === 0) {
      return res.status(404).send(`Cannot apply filter ${filter}`);
    }
    res.status(201).json(response);
  } else {
    const response = await Country.findAll({
      // where: {
      //   limit: 250,
      //   offset: req.query.page ? req.query.page : 0,
      //   order: [["name", req.query.order ? req.query.order : "ASC"]],
      //   include: { model: Activity },
      // },
    });
    if (response.length === 0) {
      console.log("Error:", error);
    }
    res.status(201).json(response);
  }
});

//POST ACTIVITY
router.post("/activities", async (req, res) => {
  const { name, difficulty, duration, season, countryId } = req.body;
  if (!name || !difficulty || !duration || !season || countryId.length === 0)
    return res.status(404).send("Falta enviar datos obligatorios");
  try {
    const [activity, created] = await Activity.findOrCreate({
      where: {
        name,
        difficulty,
        duration,
        season,
      },
    });
    console.log(created);

    // SETEO RELACIONES para volcar datos en la tabla intermadia
    await activity.setCountries(countryId);

    return res.json(activity);
  } catch (error) {
    return res.status(404).send("Error en alguno de los datos provistos");
  }
});

//GET ACTIVITIES
router.get("/activities", async (req, res) => {
  const activity = await Activity.findAll();
  return res.json(activity);
});

module.exports = router;
