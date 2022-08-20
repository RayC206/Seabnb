'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Barnacle Lane',
        city: 'Hilo',
        state: 'Hawaii',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Hilo Beach House',
        description: 'Enjoy the privacy of a six hundred square foot suite with private entrance and private access to our large covered lanai, swimming pool and Jacuzzi. Walk across the street to Honolii Beach where surfers and swimmers enjoy the sun and waves.',
        price: 120,
        previewImage: 'https://a0.muscache.com/im/pictures/4bb38f02-5d9e-4e0f-a008-136d2505468e.jpg',
      },
      {
        ownerId: 2,
        address: '456 Barnacle Lane',
        city: 'Kailua',
        state: 'Hawaii',
        country: 'United States of America',
        lat: 37.8645358,
        lng: -122.6730327,
        name: 'Kailua Beach Cottage',
        description: 'Serene, peaceful cottage, with Direct Oceanfront on 1/3 acre lot. Quiet, gated property, studded with coconut trees with the feel of old Hawaii. ',
        price: 150,
        previewImage: 'https://a0.muscache.com/im/pictures/54e20fa4-aec0-4e99-a2b5-c023a3fad92e.jpg',
      },
      {
        ownerId: 3,
        address: '888 Barnacle Lane',
        city: 'Malibu',
        state: 'California',
        country: 'United States of America',
        lat: 37.6130284,
        lng: -122.3420645,
        name: 'Malibu Beach House',
        description: 'Close enough to Los Angeles so it is an easy drive when needed but far away enough that it feels like you are truly on a vacation. Right on the water so you can’t get any closer and the neighbors are all so friendly and nice. Seals come lounge every day on the rocks about 100 yards away.',
        price: 450,
        previewImage: 'https://a0.muscache.com/im/pictures/69f224a9-837d-495d-adc7-e9275e23765e.jpg',
      },
      {
        ownerId: 4,
        address: '888 Dolphin Drive',
        city: 'Miami',
        state: 'Florida',
        country: 'United States of America',
        lat: 47.6130284,
        lng: -122.3420645,
        name: 'Miami Beachfront Apartment',
        description: 'A modern style and freshly renovated large beachfront studio apartment in Miami Beach with 180 degree ocean views of the crystal clear water and free parking.',
        price: 350,
        previewImage: 'https://a0.muscache.com/im/pictures/26435912/9ae183fe_original.jpg',
      },
      {
        ownerId: 5,
        address: '777 Pearl Drive',
        city: 'San Diego',
        state: 'California',
        country: 'United States of America',
        lat: 50.6130284,
        lng: -122.3420645,
        name: 'Luxury Villa, Beach View',
        description: 'Luxury Mediterranean Villa on top of Mt Soledad with forever white-water views from the pool decks. This spacious bedroom has its own private stairway with doors at the bottom and top of stairs for extra peace & quiet, it is in a separate section of the house, affording you maximum privacy.',
        price: 599,
        previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-31711573/original/220fd30d-c47f-4102-8426-61e81f55f3cc.jpeg',
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
