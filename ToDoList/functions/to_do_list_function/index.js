const express = require("express");
const catalystSDK = require("zcatalyst-sdk-node");
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const catalyst = catalystSDK.initialize(req);
  res.locals.catalyst = catalyst;
  next();
});

app.use("", require('./routers/basicRoutes'));

module.exports = app;

