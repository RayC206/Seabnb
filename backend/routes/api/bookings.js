const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Booking, Spot } = require('../../db/models');

const router = express.Router();

//Error variable to be called on Forbidden errors
const authorizationError = {
  "message": "Authorization required",
  "statusCode": 403
};


//Edit a Booking
router.put('/:bookingId', requireAuth,async (req, res) => {
  let bookingId = req.params.bookingId;
  let bookingParams = req.body;
  let currentUserId = req.user.id;

  // Booking must belong to the current user
  let booking = await Booking.findByPk(bookingId);
  if (booking.userId !== currentUserId) {
    return res.json(authorizationError);
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
  let spot = await Spot.findByPk(booking.spotId)
  if (booking.userId !== currentUserId && spot.ownerId !== currentUserId) {
    return res.json(authorizationError);
  }

  await Booking.destroy({
    where: {
      id: bookingId
    }
  });

  return res.json({
    message: 'Successfully deleted',
    statusCode: 200
  });
});

module.exports = router;
