'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Post }) {
            // define association here
            this.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
        }

        static async generateHash(password) {
            const salt = await bcrypt.genSalt(10)
            return await bcrypt.hash(password, salt)
        }

        static async generateToken(id) {
            return jwt.sign({ id }, "process.env.JWT_SECRET", {
                expiresIn: '30d',
            })
        }
    }
    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'User must have a name' },
                    notEmpty: { msg: 'Name must not be empty' },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'User must have a email' },
                    notEmpty: { msg: 'email must not be empty' },
                    isEmail: { msg: 'Must be a valid email address' },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'User must have a password' },
                    notEmpty: { msg: 'password must not be empty' },
                },
            },
            avator: {
                type: DataTypes.STRING,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'User must have a role' },
                    notEmpty: { msg: 'role must not be empty' },
                },
            },
        },
        {
            sequelize,
            tableName: 'users',
            modelName: 'User',
        }
    )
    return User
}
