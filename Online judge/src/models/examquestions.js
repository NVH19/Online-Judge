'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExamQuestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExamQuestions.init({
    examId: DataTypes.STRING,
    questionCount: DataTypes.INTEGER,
    questionText: DataTypes.STRING,
    answerA: DataTypes.STRING,
    answerB: DataTypes.STRING,
    answerC: DataTypes.STRING,
    answerD: DataTypes.STRING,
    correctAnswer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ExamQuestions',
  });
  return ExamQuestions;
};