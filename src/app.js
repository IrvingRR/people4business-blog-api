const express = require('express');
const postsRoutes = require('./routes/posts.routes.js');

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api", postsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;