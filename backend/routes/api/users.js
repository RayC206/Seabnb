const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Review, Spot, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];



// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);

// Get the Current User
router.get('/current-user', requireAuth, async (req, res) => {
  return res.json(req.user);
});


// Get all Spots owned by the Current User
router.get('/current-user/spots', async (req, res) => {
  const currentUserId = req.user.id;

  let spots  = await Spot.findAll({
    where: {
      ownerId: currentUserId
    }
  });

  return res.json(spots);
});


//Get all Reviews of the Current User
router.get('/current-user/reviews', async (req, res) => {
  const currentUserId = req.user.id;

  let reviews  = await Review.findAll({
    where: {
      userId: currentUserId
    }
  });

  return res.json(reviews);
});

//Get all of the Current User's Bookings
router.get('/current-user/bookings', async (req, res) => {
  const currentUserId = req.user.id;

  let bookings  = await Booking.findAll({
    where: {
      userId: currentUserId
    }
  });

  return res.json(bookings);
});

module.exports = router;
