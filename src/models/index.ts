import { Sequelize } from "sequelize"

// Create connection with proper error handling for serverless
const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "test",
  logging: false,
  pool: {
    max: 2, // Reduced for serverless
    min: 0,
    acquire: 3000,
    idle: 1000,
  },
  dialectOptions: {
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
  },
})

// Test connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.")
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err)
  })

export { sequelize }
