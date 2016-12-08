'use strict';

const low = require('lowdb'),
  db = low('db.json');

db.defaults({
  'users': []
}).value();

const router = {
  getUserInfo: function (callback) {
    return new Promise(function (resolve) {
      let user = db.get('users').find({'name': 'main'}).value();
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
      db.get('users').remove({'name': 'main'}).value();
      db.get('users').push({'name': 'main', 'level': 1, 'experience': 0, 'chopLevel': 0, 'chopExperience': 0}).value();
      return resolve(db.get('users').find({'name': 'main'}).value());
    });
  },
  updateUser: function (args, callback) {
    return new Promise(function (resolve) {
      db.get('users').find({'name': 'main'}).assign(args).value();
      return resolve(true);
    });
  }
};

module.exports = router;
