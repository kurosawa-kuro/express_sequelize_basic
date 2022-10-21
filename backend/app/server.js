const printRoutes = require("express-list-endpoints");

const app = require('.')
const { sequelize } = require("../db/models/index")

try {
    app.listen({ port: 5000 }, async () => {
        console.log('Server up on http://localhost:5000')
        // console.log(printRoutes(app));
        await sequelize.authenticate()
        // await sequelize.sync()
        console.log('Database Connected!')
    })
} catch (error) {
    console.log({ error })
}
