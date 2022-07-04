const express = require('express');
const { Booking } = require('../../db/models');

const router = express.Router();

//Edit a Booking
router.put('/:bookingId', async (req, res) => {
  // TODO: add authorization and validation (in model)
  let bookingId = req.params.bookingId;
  bookingParams = req.body;
  let booking = await Booking.update(bookingParams, {
    where: {
      id: bookingId
    }
  });
  booking = await Booking.findByPk(bookingId);
  return res.json(booking);
});

//Delete a Booking
router.delete('/:bookingId', async (req, res) => {
  // TODO: add authorization and validation (in model)
  let bookingId = req.params.bookingId;

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
