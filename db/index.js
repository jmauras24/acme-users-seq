const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL);

const Users = _conn.define('users',{
  name: Sequelize.STRING
});

const sync = () => {
  return _conn.sync({force: true})
};


const seed = () => {
  return Promise.all([
    Users.create({name: 'curly'}),
    Users.create({name: 'moe'}),
    Users.create({name: 'larry'})
  ])
};

module.exports = {
  sync,
  seed,
  models: {
    Users
  }
}
