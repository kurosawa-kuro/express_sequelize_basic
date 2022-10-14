const app = require('./app')
const { sequelize, User, Post } = require("../db/models/index")

app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database Connected!')
})