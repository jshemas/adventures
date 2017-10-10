'use strict';

const fire = require('../../../lib/action/fire');
const db = require('../../../lib/db');
const expect = require('expect.js');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();

describe('fire', function () {
  afterEach(function () {
    sandbox.restore();
  });
  context('should be able to start a fire', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 1,
        items: {
          wood: 1
        }
      });
      sandbox.stub(db, 'updateUser').resolves(true);
    });
    it('was able to start a fire', function (done) {
      fire.init().then(function (res) {
        expect(res.success).to.eql(true);
        expect(res.levelUp).to.eql(false);
        done();
      });
    });
  });
  context('should be able to start a fire and level up', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 1,
        fireLevel: 1,
        fireExperience: 5,
        items: {
          wood: 1
        }
      });
      sandbox.stub(db, 'updateUser').resolves(true);
    });
    it('was able to start a fire and level up', function (done) {
      fire.init().then(function (res) {
        expect(res.success).to.eql(true);
        expect(res.levelUp).to.eql(true);
        done();
      });
    });
  });
  context('should not be able to start a fire', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 1,
        fireLevel: 1,
        fireExperience: 5,
        items: {}
      });
      sandbox.stub(db, 'updateUser').resolves(true);
    });
    it('was not able to start a fire', function (done) {
      fire.init().then(function (res) {
        expect(res.success).to.eql(false);
        expect(res.levelUp).to.eql(false);
        done();
      });
    });
  });
});
