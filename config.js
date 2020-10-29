module.exports = {
  DB: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT
}

// MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/shopping-site',