const express = require('express');

const router = express.Router();

//edit a review
router.put('/reviews/:reviewId', async (req, res) => {
  let spotId = req.params.spotId;
  return res.json({ message: 'success' });
});

//delete a review
router.delete('/reviews/:reviewId', async (req, res) => {
  let spotId = req.params.spotId;
  return res.json({ message: 'success' });
});

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', async (req, res) => {
  return res.json({ message: 'success' });
});


module.exports = router;
