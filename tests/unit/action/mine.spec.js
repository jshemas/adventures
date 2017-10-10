'use strict';

const mine = require('../../../lib/action/mine');
const db = require('../../../lib/db');
const expect = require('expect.js');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();

describe('mine', function () {
  afterEach(function () {
    sandbox.restore();
  });
  context('should be able to mine', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 1,
        mineLevel: 3,
        mineExperience: 2,
        items: {
          rock: 1
        }
      });
      sandbox.stub(db, 'updateUser').resolves(true);
    });
    it('was able to mine', function (done) {
      mine.init().then(function (res) {
        expect(res.success).to.eql(true);
        expect(res.levelUp).to.eql(false);
        done();
      });
    });
  });
  context('should be able to mine and not get a item', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 1,
        mineLevel: 3,
        mineExperience: 2,
        items: {
          rock: 1
        }
      });
      sandbox.stub(db, 'updateUser').resolves(true);
      sandbox.stub(Math, 'random').returns(0);
    });
    it('was able to mine', function (done) {
      mine.init().then(function (res) {
        expect(res.success).to.eql(true);
        expect(res.levelUp).to.eql(false);
        expect(res.itemAdded).to.eql(false);
        done();
      });
    });
  });
  context('should be able to mine and get item', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 1,
        mineLevel: 3,
        mineExperience: 2,
        items: {
          rock: 1
        }
      });
      sandbox.stub(db, 'updateUser').resolves(true);
      sandbox.stub(Math, 'random').returns(1);
    });
    it('was able to mine and got item', function (done) {
      mine.init().then(function (res) {
        expect(res.success).to.eql(true);
        expect(res.levelUp).to.eql(false);
        expect(res.itemAdded).to.eql(true);
        done();
      });
    });
  });
  context('should be able to mine and get item when user has none', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 1,
        mineLevel: 3,
        mineExperience: 2,
        items: {}
      });
      sandbox.stub(db, 'updateUser').resolves(true);
      sandbox.stub(Math, 'random').returns(1);
    });
    it('was able to mine and got item', function (done) {
      mine.init().then(function (res) {
        expect(res.success).to.eql(true);
        expect(res.levelUp).to.eql(false);
        expect(res.itemAdded).to.eql(true);
        done();
      });
    });
  });
  context('should be able to level up from mine', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 2,
        mineLevel: 1,
        mineExperience: 5,
        items: {
          rock: 1
        }
      });
      sandbox.stub(db, 'updateUser').resolves(true);
    });
    it('was able to level up', function (done) {
      mine.init().then(function (res) {
        expect(res.success).to.eql(true);
        expect(res.levelUp).to.eql(true);
        done();
      });
    });
  });
});
