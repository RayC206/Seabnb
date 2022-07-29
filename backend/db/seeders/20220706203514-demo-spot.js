'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Barnacle Lane',
        city: 'Bikini Bottom',
        state: 'Bikini Atoll',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Spongebobs House',
        description: 'Pineapple under the sea',
        price: 120,
        previewImage: 'https://www.modern-notoriety.com/wp-content/uploads/2019/10/Pineapple.png',
      },
      {
        ownerId: 2,
        address: '456 Barnacle Lane',
        city: 'Bikini Bottom',
        state: 'Bikini Atoll',
        country: 'United States of America',
        lat: 37.8645358,
        lng: -122.6730327,
        name: 'Patricks House',
        description: 'A rock',
        price: 5,
        previewImage: 'https://static.wikia.nocookie.net/spongebob/images/3/3b/Fun-Sized_Friends_081.png',
      },
      {
        ownerId: 3,
        address: '888 Barnacle Lane',
        city: 'Bikini Bottom',
        state: 'Bikini Atoll',
        country: 'United States of America',
        lat: 37.6130284,
        lng: -122.3420645,
        name: 'Squidwards House',
        description: 'Squidwards House',
        price: 150,
        previewImage: 'https://cdnb.artstation.com/p/assets/images/images/034/434/383/large/santiago-tosoni-004.jpg',
      },
      {
        ownerId: 4,
        address: '888 Dolphin Drive',
        city: 'Bikini Bottom',
        state: 'Bikini Atoll',
        country: 'United States of America',
        lat: 47.6130284,
        lng: -122.3420645,
        name: 'Sandys House',
        description: 'Bubble dome.',
        price: 350,
        previewImage: 'https://cdnb.artstation.com/p/assets/images/images/029/104/549/large/nati-dias-sandy-house-3-nati.jpg',
      },
      {
        ownerId: 5,
        address: '777 Pearl Drive',
        city: 'Bikini Bottom',
        state: 'Bikini Atoll',
        country: 'United States of America',
        lat: 50.6130284,
        lng: -122.3420645,
        name: 'Mr.Krabs House',
        description: '5 night minimum',
        price: 999,
        previewImage: 'https://cdnb.artstation.com/p/assets/images/images/028/907/215/large/kell-alves-13-sirigueijo.jpg',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['123 Barnacle Lane', '456 Barnacle Lane', '888 Barnacle Lane','888 Dolphin Drive', '777 Pearl Drive'] }
    }, {});
  }
};
