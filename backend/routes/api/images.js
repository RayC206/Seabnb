const express = require('express');
const { Image, Review, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

const authorizationError = {
  "message": "Authorization Required"
};

//Delete an Image
router.delete('/:imageId', requireAuth,  async (req, res) => {
    let imageId = req.params.imageId;
    const currentUserId = req.user.id;

    let image = await Image.findByPk(imageId);

    if (!image) {
      return res.status(404).json({
        "message": "Image does not exist"
      })
    }



    if (image.spotId) {
      let spot = await Spot.findByPk(image.spotId);
      if (spot.ownerId !== currentUserId) {
        return res.json(authorizationError);
      }
    } else if (image.reviewId) {
      let review = await Review.findByPk(image.reviewId);
      if (review.userId !== currentUserId) {
        return res.status(403).json(authorizationError);
      }
    } else {
      return res.status(403).json(authorizationError);
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
