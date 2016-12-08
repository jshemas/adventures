'use strict';

const chop = require('./action/chop.js'),
  help = require('./action/help.js');

const router = {
  chop,
  help
};

module.exports = router;
