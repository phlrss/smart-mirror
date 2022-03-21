const https = require("https");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname.split("/api")[0] + "/public/index.html");
});

app.get("/api", async (req, res) => {
  try {
    res.send("Dashboard running.");
  } catch (e) {
    res.send(`Failed start dashboard`);
  }
});

app.get("/api/news", (req, res, next) => {
  const API_KEY = "YOUR_API_KEY";
  return https.get(
    `https://newsapi.org/v2/top-headlines?country=ca&apiKey=${API_KEY}`,
    (resp) => {
      let data = "";

      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        res.json(JSON.parse(data));
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
