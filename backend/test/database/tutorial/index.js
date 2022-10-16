const { Sequelize, DataTypes } = require('sequelize');

const { startUser } = require('./userDatabase');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});



async function start() {
    console.log("start backend\test\database\tutorial\index.js")

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    const db = {};
    db.Sequelize = Sequelize
    db.sequelize = sequelize

    db.users = require('./models/userModel')(sequelize, DataTypes)
    console.log("db.users", db.users)

    // db.sequelize.sync({ force: true }).then(() => {
    //     console.log('re synced')
    // })

    startUser(db.users)
}

start()