/* eslint-disable comma-dangle */
module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Fulano',
          email: 'exempla@gmail.com',
          phone: 12,
          password_hash: 12,
          admin: true,
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
