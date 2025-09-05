const express = require("express")
const app = express();

const urlRoute = require("./routes/url")

app.use("url",urlRoute);
const PORT = 8001
app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`))