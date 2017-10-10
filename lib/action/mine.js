'use strict';

const db = require('../db.js');
const utils = require('../utils.js');

const mine = function () {
  return new Promise(function (resolve, reject) {
    console.log('Mine Action');
    db.getUserInfo().then(function (user) {
      user.experience += 1;
      user.mineExperience += 1;
      // level up check
      let levelUp = utils.levelUp(user, 'Mineing', 'mineExperience', 'mineLevel');
      if (levelUp) user.fireLevel += 1;
      // item added
      let itemAdded = utils.itemAdd(user, 'Rock');
      if (itemAdded && user.items.rock) user.items.rock += 1;
      if (itemAdded && !user.items.rock) user.items.rock = 1;
      // update user info
      db.updateUser(user).then(function (user) {
        return resolve({'success': true, 'levelUp': levelUp, 'itemAdded': itemAdded});
      });
    });
  });
};

module.exports.init = mine;
