'use strict'

const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'posts',
      [
        {
          uuid: '2adce3d1-7c5c-4ca7-be17-14dd211faa75',
          body: faker.lorem.text(),
          userId: 1,
          createdAt: '2020-11-01T16:30:07.592Z',
          updatedAt: '2020-11-01T16:30:07.592Z',
        },
        {
          uuid: faker.datatype.uuid(),
          body: faker.lorem.text(),
          userId: 1,
          createdAt: '2020-11-01T16:30:07.592Z',
          updatedAt: '2020-11-01T16:30:07.592Z',
        },
        {
          uuid: faker.datatype.uuid(),
          body: faker.lorem.text(),
          userId: 1,
          createdAt: '2020-11-01T16:30:07.592Z',
          updatedAt: '2020-11-01T16:30:07.592Z',
        },
        {
          uuid: faker.datatype.uuid(),
          body: faker.lorem.text(),
          userId: 2,
          createdAt: '2020-11-01T16:30:07.592Z',
          updatedAt: '2020-11-01T16:30:07.592Z',
        },
        {
          uuid: faker.datatype.uuid(),
          body: faker.lorem.text(),
          userId: 3,
          createdAt: '2020-11-01T16:30:07.592Z',
          updatedAt: '2020-11-01T16:30:07.592Z',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  },
}
