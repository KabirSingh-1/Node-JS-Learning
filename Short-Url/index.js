const express = require("express");
const app = express();
const path = require('path');
const { connectToMongoDB } = require("./connect");

const urlRoute = require("./routes/url");
const URL = require("./models/Url");


connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("✅ MongoDB Has Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.set("view engine","ejs");
app.set('views', path.resolve("./views") );
app.use(express.json());

// test route
app.get("/test", async(req, res) => {
  const allUrls = await URL.find({});
//   res.send("<h1>Hey from server</h1>");
return res.render('Home',{
  urls: allUrls,
})
});

// url shortener routes
app.use("/url", urlRoute);

const PORT = 8001;
app.listen(PORT, () => console.log(`🚀 Server Started at PORT: ${PORT}`));
