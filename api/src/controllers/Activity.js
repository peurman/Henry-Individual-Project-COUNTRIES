/*  Métodos GET y POST del modelo ACTIVITY */

const { Activity } = require("../db");

//GET ACTIVITIES
const getActivities = async (req, res) => {
  const activity = await Activity.findAll({ order: [["name", "ASC"]] });
  return res.json(activity);
};

//POST ACTIVITY
const postActivity = async (req, res, next) => {
  const { name, duration, difficulty, season, countryId } = req.body;
  if (!name || !duration || !difficulty || !season || countryId.length === 0) {
    console.log("Falta enviar datos obligatorios");
    return res.status(404).send("Falta enviar datos obligatorios");
  }
  try {
    const [activity, created] = await Activity.findOrCreate({
      where: {
        name,
        duration,
        difficulty,
        season,
      },
    });
    console.log(created);

    // SETEO RELACIONES para volcar datos en la tabla intermadia
    await activity.setCountries(countryId);

    return res.json(activity);
  } catch (error) {
    console.log("Error en alguno de los datos provistos");
    return res.status(404).send("Error en alguno de los datos provistos");
  }
};

module.exports = {
  getActivities,
  postActivity,
};
