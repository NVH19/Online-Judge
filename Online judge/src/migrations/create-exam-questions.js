'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExamQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      examId: {
        type: Sequelize.STRING
      },
      questionCount: {
        type: Sequelize.INTEGER
      },
      questionText: {
        type: Sequelize.STRING
      },
      answerA: {
        type: Sequelize.STRING
      },
      answerB: {
        type: Sequelize.STRING
      },
      answerC: {
        type: Sequelize.STRING
      },
      answerD: {
        type: Sequelize.STRING
      },
      correctAnswer: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExamQuestions');
  }
};