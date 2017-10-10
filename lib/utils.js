'use strict';

exports.levelUp = function (user, skillName, skillExperience, skillLevel) {
  if (user[skillExperience] >= Math.pow(2, user[skillLevel] - 1)) {
    console.log(skillName + ' skill has been increased to level ' + user[skillLevel]);
    return true;
  } else {
    return false;
  }
};

exports.itemAdd = function (user, itemName, skillExperience, skillLevel) {
  const itemRandom = Math.random();
  if (itemRandom >= 0.75) {
    console.log(itemName + ' has been added to your inventory');
    return true;
  } else {
    return false;
  }
};
