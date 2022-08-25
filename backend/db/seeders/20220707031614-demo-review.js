'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 5,
        spotId: 1,
        review: 'Without a doubt a great experience for us staying here. Place was clean with an amazing view of the sunset. Only con is being far away from a lot of things but it gives you a great chance to explore the island more with the drive.',
        stars: 4
      },
      {
        userId: 4,
        spotId: 2,
        review: 'Loved this spot. Fantastic beaches are right around the corner - the waves in Makaha were world class and the hike to the point was excellent. Would stay again!',
        stars: 5
      },
      {
        userId: 2,
        spotId: 3,
        review: 'Great Location, perfect place to stay if you want to be close to the beach',
        stars: 4
      },
      {
        userId: 3,
        spotId: 4,
        review: 'Amazing host and Beautiful Home, really enjoyed the short walk to the beach.',
        stars: 5
      },
      {
        userId: 1,
        spotId: 5,
        review: 'Beautiful view of the Ocean, Looking forward to returning',
        stars: 5
      },
      {
        userId: 10,
        spotId: 6,
        review: 'Great get away especially for a couple!! The view is unreal and the space is more than enough for two people!!',
        stars: 5
      },
      {
        userId: 9,
        spotId: 7,
        review: 'Very clean, great view, easy access to everything. Looks just like the pictures',
        stars: 5
      },
      {
        userId: 8,
        spotId: 8,
        review: 'This is a beautiful home and very clean. The hosts provided for every comfort imaginable. We spent our days mesmerized by the amazing views. ',
        stars: 5
      },
      {
        userId: 7,
        spotId: 9,
        review: 'Beautiful airstream conversion and stunning ocean view!',
        stars: 5
      },
      {
        userId: 6,
        spotId: 10,
        review: 'Definitely worth it, great view beautiful location.',
        stars: 5
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      userId: { [Op.in]: [1, 2, 3, 4, 5] },
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
