module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'truongminhdat789@gmail.com',
      password: '123456',
      firstName: 'Trương Minh',
      lastName: 'Dat',
      address: 'Quang Nam',
      gender: 1,
      typeRole: 'Admin',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};