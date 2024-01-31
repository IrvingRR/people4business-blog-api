const express = require('express');

const app = express();

// Middlewares
app.use(express.json());

// Routes
// app.use("/api", employeesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;