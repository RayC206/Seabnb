const express = require('express');

const router = express.Router();

//Edit a Booking
router.put('/:bookingId', async (req, res) => {
  let spotId = req.params.spotId;
  return res.json({ message: 'success' });
});

//Delete a Booking
router.delete('/:bookingId', async (req, res) => {
  let spotId = req.params.spotId;
  return res.json({ message: 'success' });
});

module.exports = router;
