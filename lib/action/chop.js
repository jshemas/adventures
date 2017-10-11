'use strict';

const utils = require('../utils.js');

const chop = function () {
  return new Promise(function (resolve, reject) {
    console.log('Chop Action');
    let levelUp;
    let itemAdded;
    return utils.experienceAdd('chopExperience', 'chopLevel')
      .then(function () {
        return utils.levelUp('Chopping', 'chopExperience', 'chopLevel');
      })
      .then(function (res) {
        levelUp = res;
        return utils.itemAdd('wood');
      })
      .then(function (res) {
        itemAdded = res;
        return resolve({'success': true, 'levelUp': levelUp, 'itemAdded': itemAdded});
      });
  });
};

module.exports.init = chop;
