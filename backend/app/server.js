const printRoutes = require("express-list-endpoints");

const app = require('.')
const { sequelize } = require("../db/models/index")

app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000')
    // console.log(printRoutes(app));
    await sequelize.authenticate()
    console.log('Database Connected!')
})