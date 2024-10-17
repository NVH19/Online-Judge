'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameExam: { type: Sequelize.STRING }, 
      duration: { type: Sequelize.STRING }, 
      attempts: { type: Sequelize.STRING }, 
      questions: { type: Sequelize.STRING }, 
      date: { type: Sequelize.DATE }, 
      href: { type: Sequelize.STRING }, 
      isTimeBound: { type: Sequelize.BOOLEAN },
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
    await queryInterface.dropTable('Exams');
  }
};