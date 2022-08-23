'use strict';

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        url: 'https://a0.muscache.com/im/pictures/f00a4844-f82c-4f4c-a2a5-a6e6e4010106.jpg',
        reviewId: null,
        spotId: 1
      },
      {
        url: 'https://a0.muscache.com/im/pictures/f5fcfc48-e977-4005-bd46-0953aa201239.jpg',
        reviewId: null,
        spotId: 1
      },
      {
        url: 'https://a0.muscache.com/im/pictures/0653595a-30bd-43d2-978e-2d3a215f84e9.jpg',
        reviewId: null,
        spotId: 1
      },
      {
        url: 'https://a0.muscache.com/im/pictures/57a01263-e4bd-41a5-9ddc-1e31fa34f4bd.jpg',
        reviewId: null,
        spotId: 1
      },

      {
        url: 'https://a0.muscache.com/im/pictures/3ddeedab-a9fd-4a0d-a411-c9442ce055ea.jpg',
        reviewId: null,
        spotId: 2
      },
      {
        url: 'https://a0.muscache.com/im/pictures/ceaf3ea9-76ee-4776-aba9-77cfc38f8c82.jpg',
        reviewId: null,
        spotId: 2
      },
      {
        url: 'https://a0.muscache.com/im/pictures/f9debde1-b9cf-498a-8ea6-2f1997f12222.jpg',
        reviewId: null,
        spotId: 2
      },
      {
        url: 'https://a0.muscache.com/im/pictures/7031a98e-45e3-45dd-abcf-8307b70c2906.jpg',
        reviewId: null,
        spotId: 2
      },

      {
        url: 'https://a0.muscache.com/im/pictures/af98c7db-c8cd-4e53-bd5c-2de28c5599c7.jpg',
        reviewId: null,
        spotId: 3
      },
      {
        url: 'https://a0.muscache.com/im/pictures/e63bc4f6-688a-4e62-8abd-921a1332e222.jpg',
        reviewId: null,
        spotId: 3
      },
      {
        url: 'https://a0.muscache.com/im/pictures/32904ce8-84c0-428d-852d-64e0167e7889.jpg',
        reviewId: null,
        spotId: 3
      },
      {
        url: 'https://a0.muscache.com/im/pictures/49c45526-0940-46b3-8cd8-34a01ceadb64.jpg',
        reviewId: null,
        spotId: 3
      },

      {
        url: 'https://a0.muscache.com/im/pictures/26435918/68920d14_original.jpg',
        reviewId: null,
        spotId: 4
      },
      {
        url: 'https://a0.muscache.com/im/pictures/26366381/3978fe97_original.jpg',
        reviewId: null,
        spotId: 4
      },
      {
        url: 'https://a0.muscache.com/im/pictures/26435919/59cab162_original.jpg',
        reviewId: null,
        spotId: 4
      },
      {
        url: 'https://a0.muscache.com/im/pictures/26435940/97936143_original.jpg',
        reviewId: null,
        spotId: 4
      },

      {
        url: 'https://a0.muscache.com/im/pictures/e4c4ce1b-4dc2-4dc5-b9ff-aa7a6b2ec626.jpg',
        reviewId: null,
        spotId: 5
      },
      {
        url: 'https://a0.muscache.com/im/pictures/42e53d0b-f560-431a-8965-eb4cc259fdbb.jpg',
        reviewId: null,
        spotId: 5
      },
      {
        url: 'https://a0.muscache.com/im/pictures/40c5a5a3-4f48-49c2-8643-3df804cf0730.jpg',
        reviewId: null,
        spotId: 5
      },
      {
        url: 'https://a0.muscache.com/im/pictures/9f6f1f66-db0f-4ae5-8ed6-92130913b718.jpg',
        reviewId: null,
        spotId: 5
      },



    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5] },
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
