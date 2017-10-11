'use strict';

const db = require('./db.js');

exports.levelUp = function (skillName, skillExperience, skillLevel) {
  return new Promise(function (resolve) {
    db.getUserInfo().then(function (user) {
      let levelUp = false;
      // check user level
      if (user.experience >= Math.pow(2, user.level - 1)) {
        user.level += 1;
        console.log('Your user level has been increased to level ' + user[skillLevel]);
      }

      // check user skill level
      if (user[skillExperience] >= Math.pow(2, user[skillLevel] - 1)) {
        user[skillLevel] += 1;
        levelUp = true;
        console.log(skillName + ' skill has been increased to level ' + user[skillLevel]);
      }

      // update user info
      db.updateUser(user).then(function (user) {
        return resolve(levelUp);
      });
    });
  });
};

exports.itemCount = function (itemName) {
  return new Promise(function (resolve) {
    db.getUserInfo().then(function (user) {
      let count = 0;
      if (user.items[itemName]) count = user.items[itemName];

      // update user info
      return resolve(count);
    });
  });
};

exports.itemAdd = function (itemName) {
  return new Promise(function (resolve) {
    db.getUserInfo().then(function (user) {
      const itemRandom = Math.random();
      let itemAdded = false;

      // check to see if a item should be added
      if (itemRandom >= 0.75) {
        if (user.items[itemName]) user.items[itemName] += 1;
        if (!user.items[itemName]) user.items[itemName] = 1;
        itemAdded = true;
        console.log(itemName + ' has been added to your inventory');
      }

      // update user info
      db.updateUser(user).then(function (user) {
        return resolve(itemAdded);
      });
    });
  });
};

exports.itemRemove = function (itemName) {
  return new Promise(function (resolve) {
    db.getUserInfo().then(function (user) {
      // remove one of the item
      user.items[itemName] -= 1;
      // update user info
      db.updateUser(user).then(function (user) {
        return resolve(true);
      });
    });
  });
};

exports.experienceAdd = function (skillExperience, skillLevel) {
  return new Promise(function (resolve) {
    db.getUserInfo().then(function (user) {
      // updates experience
      user.experience += 1;
      user[skillExperience] += 1;
      if (!user[skillLevel]) user[skillLevel] = 1;

      // update user info
      db.updateUser(user).then(function () {
        return resolve(true);
      });
    });
  });
};

