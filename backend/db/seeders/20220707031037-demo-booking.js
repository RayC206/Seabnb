'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        userId: 1,
        spotId: 1,
        startDate: '2022-7-01',
        endDate: '2022-7-05'
      },
      {
        userId: 2,
        spotId: 2,
        startDate: '2022-7-06',
        endDate: '2022-7-10'
      },
      {
        userId: 3,
        spotId: 3,
        startDate: '2022-7-11',
        endDate: '2022-7-15'
      },
      {
        userId: 3,
        spotId: 3,
        startDate: '2022-7-16',
        endDate: '2022-7-20'
      },
      {
        userId: 3,
        spotId: 3,
        startDate: '2022-7-21',
        endDate: '2022-7-26'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      startDate: { [Op.in]: ['2022-7-01', '2022-7-06', '2022-7-11','2022-7-16','2022-7-21'] }
    }, {});
  }
};
