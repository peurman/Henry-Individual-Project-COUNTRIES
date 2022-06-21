/*  Métodos GET y POST del modelo ACTIVITY */

const { Activity } = require("../db");

//GET ACTIVITIES
const getActivities = async (req, res) => {
  const activity = await Activity.findAll({ order: [["name", "ASC"]] });
  return res.json(activity);
};

//POST ACTIVITY
const postActivity = async (req, res, next) => {
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
};

module.exports = {
  getActivities,
  postActivity,
};
