'use strict';

const help = function (args, callback) {
  return new Promise(function (resolve, reject) {
    console.log('Help: You can only run the chop command at this time');
    return resolve(true);
  });
};

module.exports.init = help;
