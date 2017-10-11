'use strict';

const db = require('../db.js');

const inventory = function () {
  return new Promise(function (resolve) {
    db.getUserInfo().then(function (user) {
      console.log('Inventory');
      for (let item in user.items) {
        console.log(item + ': ' + user.items[item]);
      }
      // return user info
      return resolve(user);
    });
  });
};

module.exports.init = inventory;
