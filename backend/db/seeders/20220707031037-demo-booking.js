'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        userId: 1,
        spotId: 1,
        startDate: new Date('2022-7-01'),
        endDate: new Date('2022-7-05')
      },
      {
        userId: 2,
        spotId: 2,
        startDate: new Date('2022-7-06'),
        endDate: new Date('2022-7-10')
      },
      {
        userId: 3,
        spotId: 3,
        startDate: new Date('2022-7-11'),
        endDate: new Date('2022-7-15')
      },
      {
        userId: 4,
        spotId: 4,
        startDate: new Date('2022-7-16'),
        endDate: new Date('2022-7-20')
      },
      {
        userId: 5,
        spotId: 5,
        startDate: new Date('2022-7-21'),
        endDate: new Date('2022-7-26')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      startDate: { [Op.in]: [new Date('2022-7-01'), new Date('2022-7-06'), new Date('2022-7-11'),new Date('2022-7-16'),new Date('2022-7-21')] }
    }, {});
  }
};
