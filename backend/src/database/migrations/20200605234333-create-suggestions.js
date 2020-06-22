module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('suggestions', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      subject: {
        type: 'VARCHAR(32)',
        allowNull: false,
      },
      description: {
        type: 'VARCHAR(1000)',
        allowNull: false,
      },
      creator: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('suggestions'),
};
