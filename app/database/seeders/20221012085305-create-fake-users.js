'use strict'

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
      'users',
      [
        {
          name: 'John Doe',
          email: 'john@email.com',
          uuid: '35cf1b89-56d3-433c-9f43-4198eb3725de',
          role: 'admin',
          createdAt: '2020-11-01T16:30:07.592Z',
          updatedAt: '2020-11-01T16:30:07.592Z',
        },
        {
          name: 'Jane Doe',
          email: 'jane@email.com',
          uuid: '37cf1b89-56d3-433c-9f43-4198eb8135de',
          role: 'admin',
          createdAt: '2020-11-01T16:30:07.592Z',
          updatedAt: '2020-11-01T16:30:07.592Z',
        },
      ],
      {}
    )
    await queryInterface.bulkInsert(
      'posts',
      [
        {
          uuid: '11111111111111111111111111111',
          body: 'post1',
          userId: '1',
          createdAt: '2020-11-01T16:30:07.592Z',
          updatedAt: '2020-11-01T16:30:07.592Z',
        },
        {
          uuid: '22222222222222222222',
          body: 'post2',
          userId: '1',
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
