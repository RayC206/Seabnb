const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Booking, Spot } = require('../../db/models');

const { Op } = require('sequelize');

const router = express.Router();

//Error variable to be called on authorization errors
const authorizationError = {
  "message": "Forbidden",
  "statusCode": 403
};


//Edit a Booking
router.put('/:bookingId', requireAuth,async (req, res) => {
  let bookingId = req.params.bookingId;
  let bookingParams = req.body;
  let currentUserId = req.user.id;

  let booking = await Booking.findByPk(bookingId);
  //if booking does not exist
  if (!booking) {
    return res.status(404).json({
      "message": "Booking does not exist"
    })
  }

  // Booking must belong to the current user
  if (booking.userId !== currentUserId) {
    return res.status(403).json(authorizationError);
  }

  if (booking.endDate < Date.now()) {
    return res.status(400).json({
      "message": "You cannot edit a past booking",
      "statusCode": 400
    });
  }

  let existingBookings = await Booking.findAll({
    where: {
      id: {
        [Op.not]: bookingId // booking should not conflict with itself
      },
      spotId: booking.spotId,
      [Op.and]: [{ // (StartDate1 <= EndDate2) and (EndDate1 >= StartDate2)
        startDate: {
          [Op.lte]: bookingParams.endDate
          },
        }, {
        endDate: {
          [Op.gte]: bookingParams.startDate
          }
        }],
    }
  });

  if (existingBookings.length) {
    return res.status(403).json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "statusCode": 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    })
  }

  booking = await Booking.update(bookingParams, {
    where: {
      id: bookingId
    }
  });
  booking = await Booking.findByPk(bookingId);
  return res.json(booking);
});

//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  let bookingId = req.params.bookingId;
  let currentUserId = req.user.id;

  // Booking must belong to the current user or the Spot must belong to the current user
  let booking = await Booking.findByPk(bookingId);
  if (!booking) {
    return res.status(404).json({
      "message": "Spot does not exist"
    })
  }
  let spot = await Spot.findByPk(booking.spotId)
  if (booking.userId !== currentUserId && spot.ownerId !== currentUserId) {
    return res.status(403).json(authorizationError);
  }

  if (booking.startDate < Date.now()) {
    return res.status(400).json({
      "message": "You cannot delete a past or current booking",
      "statusCode": 400
    });
  }

  await Booking.destroy({
    where: {
      id: bookingId
    }
  });

  return res.status(200).json({
    message: 'Successfully deleted',
    statusCode: 200
  });
});

module.exports = router;
