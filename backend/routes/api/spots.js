const express = require('express');
const { Image, Review, Spot } = require('../../db/models');

const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {
  let spots  = await Spot.findAll();

  return res.json(spots);
});

//Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
  let spotId = req.params.spotId;
  let spot  = await Spot.findByPk(spotId);

  return res.json(spot);
});

//Create a Spot
router.post('/', async (req, res) => {
  spotParams = req.body;
  spotParams.ownerId = req.user.id;

  let spot = await Spot.create(spotParams);
  spot = await Spot.findByPk(spot.id);
  return res.json(spot);
});

//Edit a Spot
router.put('/:spotId', async (req, res) => {
  let spotId = req.params.spotId;
  spotParams = req.body;
  let spot = await Spot.update(spotParams, {
    where: {
      id: spotId
    }
  });
  spot = await Spot.findByPk(spotId);
  return res.json(spot);
});

// Delete a Spot
router.delete('/:spotId', async (req, res) => {
  let spotId = req.params.spotId;

  await Spot.destroy({
    where: {
      id: spotId
    }
  });

  return res.json({
    message: 'Successfully deleted',
    statusCode: 200
  });
});

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const spotId = req.params.spotId;

  let reviews = await Review.findAll({
    where: {
      spotId: spotId
    }
  });

  return res.json(reviews);
});

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', async (req, res) => {
  const spotId = req.params.spotId;
  reviewParams = req.body;
  reviewParams.spotId = spotId;
  reviewParams.userId = req.user.id;

  let review = await Review.create(reviewParams);
  review = await Review.findByPk(review.id);
  return res.json(review);
});

//Get all Bookings for a Spot based on the Spot's Id
router.get('/:spotId/bookings', async (req, res) => {
  return res.json({ message: 'success' });
});

//Create a booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', async (req, res) => {
  return res.json({ message: 'success' });
});

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', async (req, res) => {
  // authorization: spot must belong to the current user
  const currentUserId = req.user.id;
  const spotId = req.params.spotId;

  let spot  = await Spot.findByPk(spotId);
  if (spot.ownerId !== currentUserId) {
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    });
  }

  imageParams = req.body;
  imageParams.spotId = spotId;

  let image = await Image.create(imageParams);
  image = await Image.findByPk(image.id);

  return res.json(image);
});

//Add Query Filters to Get All Spots
router.get('/?filter', async (req, res) => {
  let spotId = req.params.spotId;
  return res.json({ message: 'success' });
});


module.exports = router;
