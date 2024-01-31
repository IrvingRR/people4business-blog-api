const express = require('express');
const entriesRoutes = require('./routes/entries.routes.js');

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api", entriesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;