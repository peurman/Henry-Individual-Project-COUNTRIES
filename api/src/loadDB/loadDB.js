// Instalo e importo AXIOS
const axios = require("axios");
const { Country } = require("../db");

//ENDPOINTS  de paises: https://restcountries.com/v3/all
// GET https://restcountries.com/v3/name/{name}
// GET https://restcountries.com/v3/alpha/{code}

// TRAIGO TODA LA INFO DE LA API SI ES QUE LA DB ESTA VACIA
const loadDB = async () => {
  const full = await Country.count(); // -> verifico si la tabla ya esta llena
  if (!full) {
    const api = await axios.get("https://restcountries.com/v3/all");
    const data = api.data.map((el) => {
      return {
        id: el.cca3,
        name: el.name.common,
        flag: el.flags[1],
        continent: el.continents[0],
        capital: el.capital ? el.capital[0] : "doesn't have capital",
        subregion: el.subregion,
        area: el.area,
        population: el.population,
      };
    });
    await Country.bulkCreate(data); // -> lleno la DB con todos los paises
    console.log("I CALL THE API WITH AXIOS.GET");
  } else {
    console.log("DB HAD ALREADY DATA");
  }
  console.log("DB IS ALREADY FILLED");
};

module.exports = loadDB; // -> exporto la funcion para llamarla desde el index.js
