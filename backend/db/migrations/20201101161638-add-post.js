'use strict'
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.addConstraint('posts', {
            type: 'foreign key',
            name: 'userId',
            fields: ['userId'],
            references: {
                table: 'users',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('posts')
    },
}