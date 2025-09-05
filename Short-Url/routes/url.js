const express = require("express");
const router = express.Router();
const URL = require("../models/Url");
const shortid = require("shortid");

// Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  try {
    const shortId = shortid.generate();

    const newUrl = await URL.create({
      shortId,
      redirectURL: longUrl,
      visitHistory: [],
    });

    res.json({
      message: "Short URL created successfully!",
      shortUrl: `http://localhost:8001/url/${shortId}`,
      longUrl: newUrl.redirectURL,
    });
  } catch (err) {
    console.error("Error saving URL:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Redirect to original URL + log visit
router.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error("Error redirecting:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
