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
        expect(res.success).to.eql(true);
        expect(res.levelUp).to.eql(false);
        done();
      });
    });
  });
  context('should be able to chop wood and not get a item', function () {
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
      sandbox.stub(Math, 'random').returns(0);
    });
    it('was able to chop wood', function (done) {
      chop.init().then(function (res) {
        expect(res.success).to.eql(true);
        expect(res.levelUp).to.eql(false);
        expect(res.itemAdded).to.eql(false);
        done();
      });
    });
  });
  context('should be able to chop wood and get item', function () {
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
      sandbox.stub(Math, 'random').returns(1);
    });
    it('was able to chop wood and got item', function (done) {
      chop.init().then(function (res) {
        expect(res.success).to.eql(true);
        expect(res.levelUp).to.eql(false);
        expect(res.itemAdded).to.eql(true);
        done();
      });
    });
  });
  context('should be able to chop wood and get item when user has none', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 1,
        chopLevel: 3,
        chopExperience: 2,
        items: {}
      });
      sandbox.stub(db, 'updateUser').resolves(true);
      sandbox.stub(Math, 'random').returns(1);
    });
    it('was able to chop wood and got item', function (done) {
      chop.init().then(function (res) {
        expect(res.success).to.eql(true);
        expect(res.levelUp).to.eql(false);
        expect(res.itemAdded).to.eql(true);
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
        expect(res.success).to.eql(true);
        expect(res.levelUp).to.eql(true);
        done();
      });
    });
  });
});
