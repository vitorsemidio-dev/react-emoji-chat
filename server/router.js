const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('get');
  res.send('server is up and running');
});

module.exports = router;