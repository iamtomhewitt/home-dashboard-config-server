const express = require('express');
const mongo = require('../services/mongo');

const route = express.Router();

route.get('/', async (req, res) => {
  const { token } = req.query;
  const config = await mongo.getConfigForToken({ token })

  if (config) {
    res.status(200).json({ config })
  }
  else {
    res.status(500).json({ message: `Could not find config for token ${token}` })
  }
});

route.post('/', async (req, res) => {
  try {
    const { token, config } = req.body;

    await mongo.saveConfigForToken({
      token,
      config
    })
    res.status(201).json({ message: 'Config saved!' })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = route;
