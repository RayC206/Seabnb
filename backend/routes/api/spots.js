const express = require('express');

const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {
  return res.json({ message: 'success' });
});

//Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
  let spotId = req.params.spotId;
  // console.log(spotId);
  return res.json({ message: 'success' });
});

//Create a Spot
router.post('/', async (req, res) => {
  return res.json({ message: 'success' });
});

//Edit a Spot
router.put('/:spotId', async (req, res) => {
  let spotId = req.params.spotId;
  return res.json({ message: 'success' });
});

// Delete a Spot
router.delete('/:spotId', async (req, res) => {
  let spotId = req.params.spotId;
  return res.json({ message: 'success' });
});

//Get all Reviews by a Spot's id

module.exports = router;
