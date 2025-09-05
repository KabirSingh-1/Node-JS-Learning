const express = require("express")
const app = express();
const {connectToMongoDB} = require("./connect");

const urlRoute = require("./routes/url")

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=> console.log("mongoDB Has Connected"))

app.use(express.json());

app.use("/url",urlRoute);
const PORT = 8001
app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`))