'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exam.init({
    nameExam: DataTypes.STRING,
    duration: DataTypes.STRING, 
    attempts: DataTypes.STRING, 
    questions: DataTypes.STRING, 
    date: DataTypes.DATE, 
    href: DataTypes.STRING, 
    isTimeBound: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Exam',
  });
  return Exam;
};