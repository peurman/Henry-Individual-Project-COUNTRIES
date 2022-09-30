const axios = require("axios");
const { Country } = require("../db");

const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036fÅ]/g, "");
};

const loadDB = async () => {
  const full = await Country.count();
  if (!full) {
    const api = await axios.get("https://restcountries.com/v3/all");
    const data = api.data.map((el) => {
      return {
        id: el.cca3,
        name: removeDiacritics(el.name.common),
        flag: el.flags[1],
        continent: el.continents[0],
        capital: el.capital ? el.capital[0] : "doesn't have capital",
        subregion: el.subregion,
        area: el.area,
        population: el.population,
      };
    });
    await Country.bulkCreate(data);
    console.log("I CALL THE API WITH AXIOS.GET");
  } else {
    console.log("DB HAD ALREADY DATA");
  }
  console.log("DB IS ALREADY FILLED");
};

module.exports = loadDB;
