'use strict';

const utils = require('../utils.js');

const mine = function () {
  return new Promise(function (resolve, reject) {
    console.log('Mine Action');
    let levelUp;
    let itemAdded;
    return utils.experienceAdd('mineExperience', 'mineLevel')
      .then(function () {
        return utils.levelUp('Mineing', 'mineExperience', 'mineLevel');
      })
      .then(function (res) {
        levelUp = res;
        return utils.itemAdd('rock');
      })
      .then(function (res) {
        itemAdded = res;
        return resolve({'success': true, 'levelUp': levelUp, 'itemAdded': itemAdded});
      });
  });
};

module.exports.init = mine;
