'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Barnacle Lane',
        city: 'Unknown',
        state: 'Hawaii',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Spongebobs House',
        description: 'Pineapple under the sea',
        price: 120,
        previewImage: 'https://static.wikia.nocookie.net/spongefan/images/e/e1/SpongeBob_house.jpg',
      },
      {
        ownerId: 2,
        address: '456 Barnacle Lane',
        city: 'Unknown',
        state: 'Hawaii',
        country: 'United States of America',
        lat: 37.8645358,
        lng: -122.6730327,
        name: 'Patricks House',
        description: 'A rock',
        price: 350,
        previewImage: 'https://static.wikia.nocookie.net/spongefan/images/d/d5/Patrick_Star%27s_Rock_in_Season_8.png',
      },
      {
        ownerId: 3,
        address: '888 Barnacle Lane',
        city: 'Unknown',
        state: 'Hawaii',
        country: 'United States of America',
        lat: 47.6130284,
        lng: -122.3420645,
        name: 'Squidwards House',
        description: 'Squidwards House',
        price: 350,
        previewImage: 'https://static.wikia.nocookie.net/parody/images/f/f2/Squidward_house.png',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['123 Barnacle Lane', '456 Barnacle Lane', '888 Barnacle Lane'] }
    }, {});
  }
};
