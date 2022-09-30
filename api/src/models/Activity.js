const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("activity", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
      allowNull: false,
    },
    season: {
      type: DataTypes.ENUM(
        "Summer",
        "Winter",
        "Spring",
        "Autumn",
        "All the year"
      ),
      defaultValue: "All the year",
    },
  });
};
