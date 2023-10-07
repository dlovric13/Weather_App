// server/routes/weather.js
const express = require("express");
const router = express.Router();
const weatherService = require("../services/weatherService");

// Define a route to handle weather comparison requests
router.get("/compare", async (req, res) => {
  try {
    const comparisonData = await weatherService.compareWeather();
    res.json(comparisonData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
