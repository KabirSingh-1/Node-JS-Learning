const shortid = require("shortid")
const URL = require("../models/url"); // corrected path

async function handlerGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortID = shortid();   // correct usage
    await URL.create({
        shortId: shortID,                 // FIX: match schema field name
        redirectURL: body.url,
        visitHistory: [],
    });

    const allUrls = await URL.find({});
    return res.render("Home", {
        urls: allUrls,
        id: shortID || null
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await url.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
module.exports = {
    handlerGenerateNewShortURL,
    handleGetAnalytics,
};
