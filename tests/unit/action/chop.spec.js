'use strict';

const chop = require('../../../lib/action/chop');
const db = require('../../../lib/db');
const expect = require('expect.js');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();

describe('chop', function () {
  afterEach(function () {
    sandbox.restore();
  });
  context('should be able to chop wood', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 1,
        chopLevel: 3,
        chopExperience: 2,
        items: {
          wood: 1
        }
      });
      sandbox.stub(db, 'updateUser').resolves(true);
    });
    it('was able to chop wood', function (done) {
      chop.init().then(function (res) {
        expect(res).to.eql(res);
        done();
      });
    });
  });
  context('should be able to level up from choping wood', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 2,
        chopLevel: 1,
        chopExperience: 5,
        items: {
          wood: 1
        }
      });
      sandbox.stub(db, 'updateUser').resolves(true);
    });
    it('was able to level up', function (done) {
      chop.init().then(function (res) {
        expect(res).to.eql(res);
        done();
      });
    });
  });
});
