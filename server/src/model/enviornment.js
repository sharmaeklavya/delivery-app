require("dotenv").config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 4500;
const APP_URL = process.env.WEB_APP_URL;

module.exports = { DB_URL, PORT, APP_URL };
