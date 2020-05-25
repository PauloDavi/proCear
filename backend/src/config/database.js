module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'pro-cear',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
