require('dotenv').config()
const app = require('./app')
// Tables
require('./models')
// Database connection
const sequelize = require("./config/database");
(async () => {
  try {
    await sequelize.authenticate();
    console.info("DB connected successfully.")
    await sequelize.sync({ force: false })
    console.info("DB created successfully.")
  } catch (err) {
    console.error("Database connection error:", err)
  }
})()

// Listen the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))