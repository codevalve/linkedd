const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout'); // Set the default layout

// Routes
const linkRoutes = require('./routes/linkRoutes');
app.use('/', linkRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});