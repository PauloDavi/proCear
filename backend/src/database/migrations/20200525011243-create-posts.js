module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('posts', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: 'VARCHAR(32)',
        allowNull: false,
        unique: true,
      },
      description: {
        type: 'VARCHAR(1000)',
        allowNull: false,
      },
      image: {
        type: 'VARCHAR(127)',
        allowNull: true,
      },
      creator: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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

  down: (queryInterface) => queryInterface.dropTable('posts'),
};
