'use strict';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({
  'users': []
}).write();

const router = {
  getUserInfo: function (callback) {
    return new Promise(function (resolve) {
      let user = db.get('users').find({'name': 'main'}).write();
      if (user === undefined) {
        router.newUser().then(function (user) {
          return resolve(user);
        });
      } else {
        return resolve(user);
      }
    });
  },
  newUser: function (callback) {
    return new Promise(function (resolve) {
      db.get('users').remove({'name': 'main'}).write();
      db.get('users').push({
        'name': 'main',
        'level': 1,
        'experience': 0,
        'chopLevel': 1,
        'chopExperience': 0,
        'fireLevel': 1,
        'fireExperience': 0,
        'items': {}
      }).write();
      return resolve(db.get('users').find({'name': 'main'}).write());
    });
  },
  updateUser: function (args, callback) {
    return new Promise(function (resolve) {
      db.get('users').find({'name': 'main'}).assign(args).write();
      return resolve(true);
    });
  }
};

module.exports = router;
