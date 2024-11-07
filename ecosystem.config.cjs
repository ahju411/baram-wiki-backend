require('dotenv').config();

module.exports = {
    apps: [
      {
        name: "baram-wiki-backend",
        script: "./app.js",
        instances: 1,
        exec_mode: "fork",
        autorestart: true,
        watch: true,
        max_memory_restart: "500M",
        env: {
          NODE_ENV: "development",
          DB_HOST: process.env.DB_HOST,
          DB_USER: process.env.DB_USER,
          DB_PASSWORD: process.env.DB_PASSWORD,
          DB_NAME: process.env.DB_NAME,
          DB_PORT: process.env.DB_PORT,
          PORT: process.env.PORT,
        },
        env_production: {
          NODE_ENV: "production",
          DB_HOST: process.env.DB_HOST,
          DB_USER: process.env.DB_USER,
          DB_PASSWORD: process.env.DB_PASSWORD,
          DB_NAME: process.env.DB_NAME,
          DB_PORT: process.env.DB_PORT,
          PORT: process.env.PORT,
        },       
      },
    ],
  };
  