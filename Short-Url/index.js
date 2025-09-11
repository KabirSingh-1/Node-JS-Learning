const express = require("express");
const path = require('path');
const { connectToMongoDB } = require("./connect");
const URL = require('./models/url');


const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8001;
// Connect to MongoDB
connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.set("view engine","ejs");
app.set('views', path.resolve("./views"));

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/",staticRoute);
app.use("/",staticRoute);
app.use("/url", urlRoute);
app.use("/user", userRoute);

app.get('/test', async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("Home",{
    urls : allUrls,
  });
});
app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId }, // ✅ search by shortId, not _id
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    { new: true } // ✅ return updated document
  );

  if (!entry) {
    return res.status(404).send("Short URL not found!");
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`🚀 Server started at http://localhost:${PORT}`));
