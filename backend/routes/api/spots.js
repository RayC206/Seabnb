const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Booking, Image, Review, Spot, User } = require('../../db/models');
const { Op, Sequelize } = require('sequelize');

const router = express.Router();

//Error variable to be called on Forbidden errors
const authorizationError = {
  "message": "Authorization Required"
};

// Get all Spots
router.get('/', async (req, res, next) => {
  if (Object.keys(req.query).length) { // if there are query params
    return next(); // go to query filters endpoint
  }

  let spots  = await Spot.findAll();

  return res.json(spots);
});

//Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
  let spotId = req.params.spotId;
  let spot  = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      "message": "Spot does not exist!"
    });
  }

  // get numReviews and avgStarRating from Review
  let reviews = await Review.findAndCountAll({
    where: {
      spotId: spotId
    },
    attributes: [
      [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgStarRating'],
    ],
    raw: true // get only the dataValues from sequelize object
  });

  let numReviews = reviews.count;
  let avgStarRating = reviews.rows[0].avgStarRating;

  // get owner data from User
  let owner = await User.findByPk(spot.ownerId);


  // get images
  let images = await Image.findAll({
    where: {
      spotId: spot.id
    }
  });
  let imagesArray = [];
  for (let image of images) {
    imagesArray.push(image.url);
  }

  let spotDetails = {
    id: spot.id,
    ownerId: spot.ownerId,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    numReviews: numReviews,
    avgStarRating: avgStarRating,
    images: imagesArray,
    owner: {
      id: owner.id,
      firstName: owner.firstName,
      lastName: owner.lastName
    }
  };

  return res.json(spotDetails);
});

//Create a Spot
router.post('/', requireAuth, async (req, res) => {
  spotParams = req.body;
  spotParams.ownerId = req.user.id;

  let spot = await Spot.create(spotParams);
  spot = await Spot.findByPk(spot.id);
  return res.json(spot);
});

//Edit a Spot
router.put('/:spotId', requireAuth, async (req, res) => {
  let spotId = req.params.spotId;
  let spotParams = req.body;
  let currentUserId = req.user.id;

  // Spot must exist or belong to the current user
  let spot = await Spot.findByPk(spotId);
  if (!spot || spot.ownerId !== currentUserId) {
    return res.status(404).json({
      "message": "Authorization required."
    });
  }

  //checks if validations are violated and throws error
  try {
    spot = await Spot.update(spotParams, {
      where: {
        id: spotId
      }
    });
  } catch(error) {
    return res.status(400).json({
      "message": error.message
    });
  }
  spot = await Spot.findByPk(spotId);
  return res.json(spot);
});

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  let spotId = req.params.spotId;
  let currentUserId = req.user.id;

  // Spot must exist or belong to the current user
  let spot = await Spot.findByPk(spotId);
  if (!spot || spot.ownerId !== currentUserId) {
    return res.status(404).json({
      "message": "Authorization required."
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
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  reviewParams = req.body;
  reviewParams.spotId = spotId;
  reviewParams.userId = req.user.id;

  // Checks if spot given the spotId exists. If not, throws error
  const spot = await Spot.findByPk(spotId);
  if (!spot){
    return res.status(404).json({
      "message": "Spot does not exist."
    });
  }

  // Check if review exists for the spot from the current user
  let review = await Review.findAll({
    where: {
      spotId: spotId,
      userId: reviewParams.userId
    }
  })
  if (review.length) { // if such review exists, throw an error
    return res.status(403).json({
      "message": "Review for spot already exists."
    });
  }

  //throws error if missing review params (stars/review message)
  try {
    review = await Review.create(reviewParams);
    review = await Review.findByPk(review.id);
    return res.json(review);
  } catch(error) {
    return res.status(400).json({
      "message": error.message
    });
  }

});

//Get all Bookings for a Spot based on the Spot's Id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;

  let bookings  = await Booking.findAll({
    where: {
      spotId: spotId
    }
  });


  return res.json(bookings);
});

//Create a booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  bookingParams = req.body;
  bookingParams.spotId = spotId;
  bookingParams.userId = req.user.id;

  let spot = await Spot.findByPk(spotId);

  if (!spot) {
   return res.status(404).json({
      "message": "Spot couldn't be found!"
    });
  }

  // Spot must NOT belong to the current user
  if (bookingParams.userId === spot.ownerId) {
    return res.status(403).json({
      "message": "Error: You are the owner."
    });
  }

  if (bookingParams.endDate <= bookingParams.startDate) {
    return res.status(400).json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot come before startDate"
      }
    });
  }

  let existingBookings = await Booking.findAll({
    where: {
      spotId: spotId,
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

  let booking = await Booking.create(bookingParams);
  booking = await Booking.findByPk(booking.id);
  return res.json(booking);
});

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth,async (req, res) => {
  // authorization: spot must belong to the current user
  const currentUserId = req.user.id;
  const spotId = req.params.spotId;

  let spot  = await Spot.findByPk(spotId);
  if (spot.ownerId !== currentUserId) {
    return res.status(403).json(authorizationError)
  }

  imageParams = req.body;
  imageParams.spotId = spotId;

  let image = await Image.create(imageParams);
  image = await Image.findByPk(image.id);

  return res.json(image);
});

//Add Query Filters to Get All Spots
router.get('/', async (req, res) => {
  const filters = req.query;

  let page = 0; // default value
  let size = 20; // default value
  let filterQuery = {};
  let errors = {};

  if (filters.page) {
    filters.page = parseInt(filters.page);
    if (!Number.isInteger(filters.page)) {
      errors.page = "Page is invalid";
    } else if (filters.page < 0) {
      errors.page = "Page must be greater than or equal to 0";
    } else if (filters.page > 10) {
      errors.page = "Page must be less than or equal to 10";
    }
    page = filters.page; // if params set, override default value
  }
  if (filters.size) {
    filters.size = parseInt(filters.size);
    if (!Number.isInteger(filters.size)) {
      errors.size = "Size is invalid";
    } else if (filters.size < 0) {
      errors.size = "Size must be greater than or equal to 0";
    } else if (filters.size > 20) {
      errors.size = "Size must be less than or equal to 20";
    }
    size = filters.size; // if params set, override default value
  }
  if (filters.minLat) {
    filters.minLat = parseFloat(filters.minLat);
    if (Number.isNaN(filters.minLat)) {
      errors.minLat = "Minimum latitude is invalid";
    }
    filterQuery.lat = {
      [Op.gte]: filters.minLat // spot's lat should be greater than or equal to the minLat param
    }
  }
  if (filters.maxLat) {
    filters.maxLat = parseFloat(filters.maxLat);
    if (Number.isNaN(filters.maxLat)) {
      errors.maxLat = "Maximum latitude is invalid";
    }
    filterQuery.lat = {
      [Op.lte]: filters.maxLat // spot's lat should be less than or equal to the maxLat param
    }
  }
  if (filters.minLng) {
    filters.minLng = parseFloat(filters.minLng);
    if (Number.isNaN(filters.minLng)) {
      errors.minLng = "Minimum longitude is invalid";
    }
    filterQuery.lng = {
      [Op.gte]: filters.minLng // spot's lng should be greater than or equal to the minLng param
    }
  }
  if (filters.maxLng) {
    filters.maxLng = parseFloat(filters.maxLng);
    if (Number.isNaN(filters.maxLng)) {
      errors.maxLng = "Maximum longitude is invalid";
    }
    filterQuery.lng = {
      [Op.lte]: filters.maxLng // spot's lng should be less than or equal to the maxLng param
    }
  }
  if (filters.minPrice) {
    filters.minPrice = parseFloat(filters.minPrice);
    if (Number.isNaN(filters.minPrice)) {
      errors.minPrice = "Minimum price is invalid";
    } else if (filters.minPrice <= 0) {
      errors.minPrice = "Minimum price must be greater than 0";
    }
    filterQuery.price = {
      [Op.gte]: filters.minPrice // spot's price should be greater than or equal to the minPrice param
    }
  }
  if (filters.maxPrice) {
    filters.maxPrice = parseFloat(filters.maxPrice);
    if (Number.isNaN(filters.maxPrice)) {
      errors.maxPrice = "Minimum price is invalid";
    } else if (filters.maxPrice <= 0) {
      errors.maxPrice = "Minimum price must be greater than 0";
    }
    filterQuery.price = {
      [Op.lte]: filters.maxPrice // spot's price should be less than or equal to the maxPrice param
    }
  }

  if (Object.keys(errors).length) { // if errors object is not empty
    return res.status(400).json({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": errors
    });
  }


  let spots = await Spot.findAndCountAll({
    limit: size,
    offset: size * (page - 1),
    where: filterQuery
  })
  return res.json(spots);
});


module.exports = router;
