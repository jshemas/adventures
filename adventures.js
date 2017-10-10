'use strict';

const wrapper = require('./lib');
const option = process.argv[2];

if (option === undefined) {
  wrapper.help.init();
} else {
  wrapper[option].init();
}

module.exports = wrapper;
