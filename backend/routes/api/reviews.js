const express = require('express');
const { Image, Review } = require('../../db/models');

const router = express.Router();

//edit a review
router.put('/:reviewId', async (req, res) => {
  let reviewId = req.params.reviewId;
  let reviewParams = req.body;
  let currentUserId = req.user.id;

  // Review must belong to the current user
  let review = await Review.findByPk(reviewId);
  if (review.userId !== currentUserId) {
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    });
  }

  review = await Review.update(reviewParams, {
    where: {
      id: reviewId
    }
  });
  review = await Review.findByPk(reviewId);
  return res.json(review);
});

//delete a review
router.delete('/:reviewId', async (req, res) => {
  let reviewId = req.params.reviewId;
  let currentUserId = req.user.id;

  // Review must belong to the current user
  let review = await Review.findByPk(reviewId);
  if (review.userId !== currentUserId) {
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    });
  }

  await Review.destroy({
    where: {
      id: reviewId
    }
  });
  return res.json({
    message: 'Successfully deleted',
    statusCode: 200
  });
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
