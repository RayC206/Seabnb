const express = require('express');
const { Booking, Image, Review, Spot } = require('../../db/models');
const { Op } = require('sequelize');
const spot = require('../../db/models/spot');

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
  let spotParams = req.body;
  let currentUserId = req.user.id;

  // Spot must belong to the current user
  let spot = await Spot.findByPk(spotId);
  if (spot.ownerId !== currentUserId) {
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    });
  }

  spot = await Spot.update(spotParams, {
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
  let currentUserId = req.user.id;

  // Spot must belong to the current user
  let spot = await Spot.findByPk(spotId);
  if (spot.ownerId !== currentUserId) {
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    });
  }

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
  const spotId = req.params.spotId;
  bookingParams = req.body;
  bookingParams.spotId = spotId;
  bookingParams.userId = req.user.id;

  let spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    });
  }

  // Spot must NOT belong to the current user
  if (bookingParams.userId === spot.ownerId) {
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    });
  }

  if (bookingParams.endDate <= bookingParams.startDate) {
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot come before startDate"
      }
    });
  }

  // TODO: fix query
  let existingBookings = await Booking.findAll({
    where: {
      spotId: spotId,
      [Op.not]: [{
        [Op.or]: [{
          startDate: { // existing booking with startDate between the new booking's dates
            [Op.between]: [bookingParams.startDate, bookingParams.endDate]
          }
        }, {
          endDate: { // existing booking with endDate between the new booking's dates
            [Op.between]: [bookingParams.startDate, bookingParams.endDate]
          }
        }]
      }]
    //   [Op.and]: [{
    //       startDate: {
    //         [Op.or]: {
    //           [Op.lte]: bookingParams.startDate,
    //           [Op.lte]: bookingParams.endDate
    //         },
    //       }
    //     }, {
    //       endDate: {
    //         [Op.or]: {
    //           [Op.lte]: bookingParams.startDate,
    //           [Op.lte]: bookingParams.endDate
    //         }
    //       }
    //   }],
    //   [Op.and]: [{
    //     startDate: {
    //       [Op.or]: {
    //         [Op.gte]: bookingParams.startDate,
    //         [Op.gte]: bookingParams.endDate
    //       },
    //     }
    //   }, {
    //     endDate: {
    //       [Op.or]: {
    //         [Op.gte]: bookingParams.startDate,
    //         [Op.gte]: bookingParams.endDate
    //       }
    //     }
    // }]
    }
  });

  if (existingBookings.length) {
    return res.json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "statusCode": 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    })
  }

  let booking = await Booking.create(bookingParams);
  booking = await Booking.findByPk(booking.id);
  return res.json(booking);
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
