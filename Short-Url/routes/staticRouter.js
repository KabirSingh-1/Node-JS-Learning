const express = require("express");
const router = express.Router();
const URL = require("../models/url");

// Homepage
router.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.render("Home", { urls: allUrls, id: null });
  } catch (err) {
    console.error("Error fetching URLs:", err);
    return res.status(500).send("Server error");
  }
});

router.get('/signup',(req,res)=>{
  return res.render("signup");
});
router.get('/login',(req,res)=>{
  return res.render("login");
});

module.exports = router;
