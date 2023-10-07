//app.js
const express = require("express");
const cors = require("cors"); 
const weatherRoutes = require("./routes/weather");

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use("/weather", weatherRoutes); // Mount the weather routes at /weather

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
