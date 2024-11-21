const express = require("express");
const { mongoose } = require("mongoose");
const cookieParser=require("cookie-parser")
const cors = require("cors");
const routes = require("./routes/routes");
const auth = require('./routes/auth')

const app = express();

app.use(
  cors({ //resourse share communication nadakn from 1 server to anoter .for better connectvity
    origin: "http://localhost:3000",
  })
);

app.use(express.json());//is is middleware to use expess json responce details as jsonnoed(all equest are in json format)
app.use(cookieParser());
app.use("/", routes);
app.use("/", auth)


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect("mongodb://localhost:27017/kba_courses");

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});