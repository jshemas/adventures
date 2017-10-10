'use strict';

const db = require('../db.js');

const mine = function () {
  return new Promise(function (resolve, reject) {
    console.log('Mine Action');
    db.getUserInfo().then(function (user) {
      user.experience += 1;
      user.mineExperience += 1;
      // level up check
      let levelUp = false;
      if (user.mineExperience >= Math.pow(2, user.mineLevel - 1)) {
        user.mineLevel += 1;
        levelUp = true;
        console.log('Mineing skill has been increased to level ' + user.mineLevel);
      }
      // item added
      const itemRandom = Math.random();
      let itemAdded = false;
      if (itemRandom >= 0.75) {
        itemAdded = true;
        if (user.items.rock) {
          user.items.rock += 1;
        } else {
          user.items.rock = 1;
        }
        console.log('Rock has been added to your inventory');
      }
      db.updateUser(user).then(function (user) {
        return resolve({'success': true, 'levelUp': levelUp, 'itemAdded': itemAdded});
      });
    });
  });
};

module.exports.init = mine;
