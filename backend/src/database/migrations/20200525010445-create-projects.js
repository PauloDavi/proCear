module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('projects', {
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
      image: {
        type: 'VARCHAR(127)',
        allowNull: true,
      },
      description: {
        type: 'VARCHAR(1000)',
        allowNull: false,
      },
      date_finish: {
        type: Sequelize.DATE,
      },
      creator: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      votes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
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

  down: (queryInterface) => queryInterface.dropTable('projects'),
};
