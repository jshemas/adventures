'use strict';

const expect = require('expect.js'),
  exec = require('child_process').exec;

describe('Adventures Test - ', function () {
  it('Can the user run the help command', function (done) {
    exec('node adventures.js help', function (error, stdout) {
      if (error) {
        console.log('error:', error);
      }
      expect(stdout).to.be('Help: You can only run the chop command at this time\n');
      done();
    });
  });
});
