'use strict';

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        url: 'img.com/5',
        reviewId: 1,
        spotId: 1
      },
      {
        url: 'img.com/4',
        reviewId: 2,
        spotId: 2
      },
      {
        url: 'img.com/3',
        reviewId: 3,
        spotId: 3
      },
      {
        url: 'img.com/2',
        reviewId: 4,
        spotId: 4
      },
      {
        url: 'img.com/1',
        reviewId: 5,
        spotId: 5
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5] },
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
