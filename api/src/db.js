require("dotenv").config(); // Dotenv es un módulo de npm que carga las variables de entorno de un archivo .env en process.env.para poder cargar el archivo .env

const { Sequelize } = require("sequelize"); // importo Sequelize
const fs = require("fs"); // FS es parte de Node.js, para acceder e interactuaar con el file system
const path = require("path"); // path es parte de Node.js, para acceder al path (métodos dirname, basename o extname)
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env; // me traigo los datos de .env

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
        { logging: false, native: false }
      );

// const sequelize = new Sequelize( //para conectar la DB, creo la instancia de Sequelize pasando una conecxión URI
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

// *****************************************************************
const basename = path.basename(__filename);
const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });
modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
// *****************************************************************
/*  ↑↑↑↑↑↑↑↑↑↑↑↑↑ TODO ESTO es lo mismo que hacer: ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const modelActivity = require("./models/Activity.js");
const modelCountry= require("./models/Country.js"); 
modelCharacter(sequelize);
modelAbility(sequelize);
*/

const { Country, Activity } = sequelize.models;

Country.belongsToMany(Activity, { through: "Country_Activity" });
Activity.belongsToMany(Country, { through: "Country_Activity" });

// MIXINS generados de cada modelo Country o Activity
// const model = Activity; // yourSequelizeModel
// for (let assoc of Object.keys(model.associations)) {
//   for (let accessor of Object.keys(model.associations[assoc].accessors)) {
//     console.log(
//       model.name + "." + model.associations[assoc].accessors[accessor] + "()"
//     );
//   }
// }

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
