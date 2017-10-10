'use strict';

const chop = require('./action/chop.js');
const fire = require('./action/fire.js');
const help = require('./action/help.js');

const router = {
  chop,
  fire,
  help
};

module.exports = router;
