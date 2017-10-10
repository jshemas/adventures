'use strict';

const chop = require('./action/chop.js');
const fire = require('./action/fire.js');
const help = require('./action/help.js');
const mine = require('./action/mine.js');

const router = {
  chop,
  fire,
  help,
  mine
};

module.exports = router;
