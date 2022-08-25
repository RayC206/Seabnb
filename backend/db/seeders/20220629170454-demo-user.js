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
      },
      {
        email: 'joelle@user.io',
        username: 'joelleP',
        firstName: 'Joelle',
        lastName: 'Pickrell',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'alex@user.io',
        username: 'alexHenry',
        firstName: 'Alex',
        lastName: 'Henry',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'reynalyn@user.io',
        username: 'leoleo',
        firstName: 'Reynalyn',
        lastName: 'Munoz',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        email: 'pacman@user.io',
        username: 'pacman',
        firstName: 'Manny',
        lastName: 'Pacquiao',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        email: 'Joe@user.io',
        username: 'JoePick',
        firstName: 'Joe',
        lastName: 'Pickrell',
        hashedPassword: bcrypt.hashSync('password10')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['DemoUser', 'tellelelele', 'rayuser'] }
    }, {});
  }
};
