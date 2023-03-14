const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Controller = require("./Controller/Controller");
const middelware = require("./middelware/UserMid");
//mongoose.connect("mongodb://127.0.0.1:27017/ead7");
mongoose.connect("mongodb://127.0.0.1:27017/my_database", (err) => {
  if (err) throw err;
  console.log("Successfully connected to database!!");
});
app.use(cors());
app.use(express.json());
let port = 3000;
app.post("/signup", Controller.insert);
app.get("/userdata", middelware.isAuthenticate, Controller.getAll);
app.get("/delete/:id", middelware.isAuthenticate, Controller.Delete);
app.get("/find/:id", middelware.isAuthenticate, Controller.find);
app.post("/update/:id", middelware.isAuthenticate, Controller.Update);
app.post("/signin", Controller.signin);
app.listen(3001, function () {
  console.log(`Server is listening at port ${port}`);
});
