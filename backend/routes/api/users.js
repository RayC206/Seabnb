const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Booking, Image, Review, Spot, User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  try {
    const user = await User.signup({
      email,
      username,
      password,
      firstName,
      lastName,
    });

    const token = await setTokenCookie(res, user);

    const newUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      token: token,
    };

    return res.json(newUser);
  } catch (error) {
    return res.status(403).json({
      message: error.message,
    });
  }
});

// Get the Current User
router.get("/current-user", requireAuth, async (req, res) => {
  return res.json(req.user);
});

// Get all Spots owned by the Current User
router.get("/current-user/spots", requireAuth, async (req, res) => {
  const currentUserId = req.user.id;

  let spots = await Spot.findAll({
    where: {
      ownerId: currentUserId,
    },
  });

  return res.json(spots);
});

//Get all Reviews of the Current User
router.get("/current-user/reviews", requireAuth, async (req, res) => {
  const currentUser = req.user;
  let reviewsArray = [];

  let reviews = await Review.findAll({
    where: {
      userId: currentUser.id,
    },
  });
  //checks all reviews with images to push into an array
  for (let review of reviews) {
    let spot = await Spot.findByPk(review.spotId);
    let images = await Image.findAll({
      where: {
        reviewId: review.id,
      },
    });
    let imagesArray = [];
    for (let image of images) {
      imagesArray.push(image.url);
    }

    reviewsArray.push({
      review,
      user: {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
      },
      spot,
      images: imagesArray,
    });
  }

  return res.json(reviewsArray);
});

//Get all of the Current User's Bookings
router.get("/current-user/bookings", requireAuth, async (req, res) => {
  const currentUserId = req.user.id;

  let bookings = await Booking.findAll({
    where: {
      userId: currentUserId,
    },
    include: {
      model: Spot,
      attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "price",
        "previewImage",
      ],
    },
  });

  return res.json(bookings);
});

module.exports = router;
