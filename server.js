const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const { PrismaClient } = require('@prisma/client');
const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();
//const helmet = require('helmet');

const app = express();

/*
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.tailwindcss.com","https://cdnjs.cloudflare.com","https://codevalve.com","https://codevalve.github.io"], // Allow scripts from 'self' and other trusted sources
      objectSrc: ["'none'"],
      styleSrc: ["'self'", "https://cdnjs.cloudflare.com"], // Allow Font Awesome styles
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],  // Allow fonts from Font Awesome
      upgradeInsecureRequests: [],
    },
  })
);
*/
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout'); // Set the default layout

// Function to capture screenshot as Base64
async function captureScreenshot(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const screenshot = await page.screenshot({ encoding: 'base64' });
  await browser.close();
  return screenshot;
}

async function captureScreenshot(url, outputFilePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Capture the screenshot and save it as a file
  await page.screenshot({ path: outputFilePath, fullPage: false });

  await browser.close();
}

function urlToFilename(url) {
  return url
    .replace(/^https?:\/\//, '')   // Remove 'http://' or 'https://'
    .replace(/\./g, '-')           // Replace dots with dashes
    .replace(/[^\w\-]/g, '')       // Remove any other non-alphanumeric characters
    + '.png';                      // Append the .png extension
}

// Routes

// API endpoint to capture and save screenshot as a PNG file
app.post('/api/screenshot', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send({ error: 'URL is required' });
  }

  try {
    // Generate the filename based on the URL
    const fileName = urlToFilename(url);

    // Define the file path where you want to save the screenshot
    const outputFilePath = path.join(__dirname, 'public', 'images', fileName);

    // Ensure the 'public/images' directory exists
    if (!fs.existsSync(path.join(__dirname, 'public', 'images'))) {
      fs.mkdirSync(path.join(__dirname, 'public', 'images'), { recursive: true });
    }

    // Capture the screenshot and save it directly to the file
    await captureScreenshot(url, outputFilePath);

    /// Optionally, save the URL and file path in the database
    //const newLink = await prisma.link.create({
    //  data: {
    //    url: url,
    //    screenshot: `/public/images/${fileName}`,  // Store the relative path in the database
    //  },
    //});

    res.status(201).json({ message: 'Screenshot saved', link: outputFilePath });
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    res.status(500).json({ error: 'Failed to capture screenshot' });
  }
});

const linkRoutes = require('./routes/linkRoutes');
app.use('/', linkRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});