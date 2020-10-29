const express = require('express');
const route = express.Router();
const path = require('path');

route.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

module.exports = route;


