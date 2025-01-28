const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const path = require('path');

const mongoConnect = require('./db/connect');
mongoConnect();

const menuRouter = require('./router/menuRouter');

app.use(cors());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the menuRouter for API routes
app.use(menuRouter);

// Listen on the port from the environment variables or default to 3000 if not defined
const PORT = process.env.PORT || 3000;  // Use PORT from .env or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

