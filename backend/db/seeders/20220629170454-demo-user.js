'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'pattyflipper92',
        firstName: 'Spongebob',
        lastName: 'Squarepants',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'patrickstar@user.io',
        username: 'thisIsPatrick',
        firstName: 'Patrick',
        lastName: 'Star',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'squidward@user.io',
        username: 'boldnbrash',
        firstName: 'Squidward',
        lastName: 'Tenticles',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'sandycheeks@user.io',
        username: 'tailedTexan1',
        firstName: 'Sandy',
        lastName: 'Cheeks',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'eugeneKrabs@user.io',
        username: 'getMoneyBusiness',
        firstName: 'Eugene',
        lastName: 'Krabs',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['pattyflipper92', 'thisIsPatrick', 'boldnbrash'] }
    }, {});
  }
};
