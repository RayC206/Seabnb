'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
        review: 'The bed was a little too high, the pet snail meows when he wants food. Other than that, the place is welcoming',
        stars: 4
      },
      {
        userId: 2,
        spotId: 2,
        review: 'Very tight space, not recommended if you are claustrophobic.',
        stars: 2
      },
      {
        userId: 3,
        spotId: 3,
        review: 'Neighbors were noisy, and the art pieces displayed were very strange.',
        stars: '3'
      },
      {
        userId: 4,
        spotId: 4,
        review: 'Water helmetis  needed if you have gills, very nice land experience ',
        stars: 5
      },
      {
        userId: 5,
        spotId: 5,
        review: 'Too expensive, I was told extra pillows and blankets were 10 dollars extra! Also, The appliances were all coin operated! Rip off.',
        stars: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
