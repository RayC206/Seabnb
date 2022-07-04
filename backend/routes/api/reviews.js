const express = require('express');
const { Image, Review } = require('../../db/models');

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
  // authorization: spot must belong to the current user
  const currentUserId = req.user.id;
  const reviewId = req.params.reviewId;

  let review  = await Review.findByPk(reviewId);
  if (review.userId !== currentUserId) {
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    });
  }

  imageParams = req.body;
  imageParams.reviewId = reviewId;

  let image = await Image.create(imageParams);
  image = await Image.findByPk(image.id);

  return res.json(image);
});


module.exports = router;
