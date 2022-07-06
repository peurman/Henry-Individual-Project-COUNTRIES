//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const loadDB = require("./src/loadDB/loadDB.js");

// Syncing all the models at once -> hago FORCE FALSE para no llamar a la API cada vez que se ejecuta el server
conn.sync({ force: false }).then(async () => {
  try {
    await loadDB(); // CARGO la DB!!
    server.listen(process.env.PORT, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  } catch (error) {
    console.log(error);
  }
});
