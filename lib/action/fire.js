'use strict';

const utils = require('../utils.js');

const fire = function () {
  return new Promise(function (resolve, reject) {
    console.log('Fire Action');
    let levelUp;
    return utils.itemCount('wood')
      .then(function (count) {
        if (count === 0) {
          console.log('You need Wood to start a fire');
          return resolve({'success': false, 'levelUp': false});
        }
        return utils.experienceAdd('fireExperience', 'fireLevel');
      })
      .then(function () {
        return utils.levelUp('Fire', 'fireExperience', 'fireLevel');
      })
      .then(function (res) {
        levelUp = res;
        return utils.itemRemove('wood');
      })
      .then(function () {
        return resolve({'success': true, 'levelUp': levelUp});
      });
  });
};

module.exports.init = fire;
