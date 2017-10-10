'use strict';

const db = require('../db.js');
const utils = require('../utils.js');

const chop = function () {
  return new Promise(function (resolve, reject) {
    console.log('Chop Action');
    db.getUserInfo().then(function (user) {
      user.experience += 1;
      user.chopExperience += 1;
      if (!user.chopLevel) user.chopLevel = 1;
      // level up check
      let levelUp = utils.levelUp(user, 'Chopping', 'chopExperience', 'chopLevel');
      if (levelUp) user.chopLevel += 1;
      // item added
      let itemAdded = utils.itemAdd(user, 'Wood');
      if (itemAdded && user.items.wood) user.items.wood += 1;
      if (itemAdded && !user.items.wood) user.items.wood = 1;
      // update user info
      db.updateUser(user).then(function (user) {
        return resolve({'success': true, 'levelUp': levelUp, 'itemAdded': itemAdded});
      });
    });
  });
};

module.exports.init = chop;
