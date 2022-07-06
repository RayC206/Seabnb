'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Spots', [
      {
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Spongebob\'s House',
        description: 'Pineapple under the sea',
        price: 120.50,
        previewImage: 'https://static.wikia.nocookie.net/spongefan/images/e/e1/SpongeBob_house.jpg',
        ownerId: 1
      },
      {
        address: '456 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.8645358,
        lng: -122.6730327,
        name: 'Patrick\'s House',
        description: 'A rock',
        price: 350.00,
        previewImage: 'https://static.wikia.nocookie.net/spongefan/images/d/d5/Patrick_Star%27s_Rock_in_Season_8.png',
        ownerId: 1
      },
      {
        ownerId: 2,
        address: "888 5th Ave",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 47.6130284,
        lng: -122.3420645,
        name: "Squidward\'s House",
        description: "Squidward\'s House",
        price: 350.00,
        previewImage: "https://static.wikia.nocookie.net/parody/images/f/f2/Squidward_house.png",
        ownerId: 2
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ["Spongebob's House", "Patrick's House", "Squidward's House"] }
    }, {});
  }
};
