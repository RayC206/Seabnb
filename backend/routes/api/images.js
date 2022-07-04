const express = require('express');
const { Image, Review, Spot } = require('../../db/models');

const router = express.Router();

const forbiddenError = {
  "message": "Forbidden",
  "statusCode": 403
};

//Delete an Image
router.delete('/:imageId', async (req, res) => {
    let imageId = req.params.imageId;
    const currentUserId = req.user.id;

    let image = await Image.findByPk(imageId);

    if (image.spotId) {
      let spot = await Spot.findByPk(image.spotId);
      if (spot.ownerId !== currentUserId) {
        return res.json(forbiddenError);
      }
    } else if (image.reviewId) {
      let review = await Review.findByPk(image.reviewId);
      if (review.userId !== currentUserId) {
        return res.json(forbiddenError);
      }
    } else {
      return res.json(forbiddenError);
    }

    await Image.destroy({
      where: {
        id: imageId
      }
    });

    return res.json({
      message: 'Successfully deleted',
      statusCode: 200
    });
});

module.exports = router;
