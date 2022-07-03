const express = require('express');

const router = express.Router();

//Delete an Image
router.delete('/:imagesId', async (req, res) => {
  let spotId = req.params.spotId;
  return res.json({ message: 'success' });
});

module.exports = router;
