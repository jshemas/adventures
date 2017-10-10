'use strict';

const db = require('../db.js');

const fire = function () {
  return new Promise(function (resolve, reject) {
    console.log('Fire Action');
    db.getUserInfo().then(function (user) {
      // does user have wood?
      if (user.items && user.items.wood && user.items.wood >= 1) {
        user.experience += 1;
        user.fireExperience += 1;
        user.items.wood -= 1; // remove one wood for fire
        // level up check
        let levelUp = false;
        if (user.fireExperience >= Math.pow(2, user.fireLevel - 1)) {
          user.fireLevel += 1;
          levelUp = true;
          console.log('Fire skill has been increased to level ' + user.fireLevel);
        }
        db.updateUser(user).then(function (user) {
          return resolve({'success': true, 'levelUp': levelUp});
        });
      } else {
        console.log('You need Wood to start a fire');
        return resolve({'success': false, 'levelUp': false});
      }
    });
  });
};

module.exports.init = fire;
