'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'books',
      [
        {
          title: faker.word.adjective(5),
          body: faker.lorem.text(),
          cover: faker.image.image(),
          createdAt: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        },
        {
          title: faker.word.adjective(5),
          body: faker.lorem.text(),
          cover: faker.image.image(),
          createdAt: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        },
        {
          title: faker.word.adjective(5),
          body: faker.lorem.text(),
          cover: faker.image.image(),
          createdAt: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        },
        {
          title: faker.word.adjective(5),
          body: faker.lorem.text(),
          cover: faker.image.image(),
          createdAt: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        },
        {
          title: faker.word.adjective(5),
          body: faker.lorem.text(),
          cover: faker.image.image(),
          createdAt: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
