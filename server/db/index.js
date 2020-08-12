const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: [] })
  .write();


const userList = () => {
  return db.get('users')
    .value()
    .map(item => item.username);
}
const addUser = (username, password) => {
  return db
    .get('users')
    .push({ username, password })
    .write();
}
const hasUser = (username, password) => {
  return !!db.get('users')
    .find({ username, password })
    .value();
}
const hasUserByUsername = (username) => {
  return !!db.get('users')
    .find({ username })
    .value();
}

module.exports = {
  db,
  userList,
  addUser,
  hasUser,
  hasUserByUsername
};
