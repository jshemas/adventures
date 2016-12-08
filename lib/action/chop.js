'use strict';

const db = require('../db.js');

const chop = function (args, callback) {
  return new Promise(function (resolve, reject) {
    console.log('Chop Action');
    db.getUserInfo().then(function (user) {
      user.experience += 1;
      user.chopExperience += 1;
      db.updateUser(user).then(function (user) {
        return resolve(true);
      });
    });
  });
};

module.exports.init = chop;
