'use strict';

const db = require('../db.js');

const chop = function () {
  return new Promise(function (resolve, reject) {
    console.log('Chop Action');
    db.getUserInfo().then(function (user) {
      user.experience += 1;
      user.chopExperience += 1;
      // level up check
      if (user.chopExperience >= Math.pow(2, user.chopLevel - 1)) {
        user.chopLevel += 1;
        console.log('Chopping skill has been increased to level ' + user.chopLevel);
      }
      // item added
      const itemRandom = Math.random();
      if (itemRandom >= 0.75) {
        if (user.items.wood) {
          user.items.wood += 1;
        } else {
          user.items.wood = 1;
        }
        console.log('Wood has been added to your inventory');
      }
      db.updateUser(user).then(function (user) {
        return resolve(user);
      });
    });
  });
};

module.exports.init = chop;
