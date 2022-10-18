const { Sequelize, DataTypes } = require('sequelize');

const { startBasicOperation } = require('./1_basicOperation');
const { startRelationOperation } = require('./3_relationOperation');

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

    db.User = require('./models/userModel')(sequelize, DataTypes)
    console.log("db.User", db.User)

    db.posts = require('./models/postModel')(sequelize, DataTypes)
    console.log("db.posts", db.posts)

    db.tags = require('./models/tagModel')(sequelize, DataTypes)
    console.log("db.posts", db.tags)

    db.PostTags = require('./models/postTagModel')(sequelize, DataTypes)
    console.log("db.posts", db.PostTags)

    // One To One
    // db.User.hasOne(db.posts, { foreignKey: 'user_id' })

    // One To Many
    db.User.hasMany(db.posts, { foreignKey: 'user_id' })
    db.posts.belongsTo(db.User, { foreignKey: 'user_id' })

    // Many To Many
    db.posts.belongsToMany(db.tags, { through: 'post_tags' })
    db.tags.belongsToMany(db.posts, { through: 'post_tags' })

    // db.sequelize.sync({ force: true }).then(() => { console.log('re synced') })

    // startBasicOperation(db.User)
    startRelationOperation(db)
}

start()