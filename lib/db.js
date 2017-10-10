'use strict';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({
  'users': []
}).write();

const router = {
  deleteUser: function (callback) {
    return new Promise(function (resolve) {
      db.get('users').remove({'name': 'main'}).write();
      return resolve(true);
    });
  },
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
        'items': {}
      }).write();
      return resolve(db.get('users').find({'name': 'main'}).write());
    });
  },
  updateUser: function (args, callback) {
    return new Promise(function (resolve) {
      db.get('users').find({'name': 'main'}).assign(args).write();
      router.getUserInfo().then(function (user) {
        return resolve(user);
      });
    });
  }
};

module.exports = router;
