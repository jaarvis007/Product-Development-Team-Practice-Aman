const express = require("express");
const catalystSDK = require("zcatalyst-sdk-node");
const { fetchAll, AddTask, deleteTask, updateTask, searchTask } = require("../controllers/basicControllers");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  const catalyst = catalystSDK.initialize(req);
  res.locals.catalyst = catalyst;
  next();
});

app.get("/all", fetchAll);
app.post("/add", AddTask);
app.delete("/delete/:ROWID",deleteTask);
app.post("/update/:ROWID", updateTask);
app.get("/search",searchTask);

module.exports = app;