'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'DemoUser',
        firstName: 'Demo User',
        lastName: 'Test',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'telle@user.io',
        username: 'tellelelele',
        firstName: 'Telle',
        lastName: 'O',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'ray@user.io',
        username: 'rayuser',
        firstName: 'Ray',
        lastName: 'H',
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
        email: 'jefferyKrabs@user.io',
        username: 'getMeDollar',
        firstName: 'Jeffery',
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
