const express = require('express');

const route = express.Router();

route.post('/', async (req, res) => {
  res.json({ message: 'up' })
});
module.exports = route;
