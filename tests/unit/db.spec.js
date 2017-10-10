'use strict';

const db = require('../../lib/db');
const expect = require('expect.js');

describe('db', function () {
  describe('newUser', function () {
    context('should be able to make a new user', function () {
      it('was able to make a new user', function (done) {
        db.newUser().then(function (res) {
          expect(res.name).to.eql('main');
          expect(res.level).to.eql(1);
          expect(res.experience).to.eql(0);
          done();
        });
      });
    });
  });
  describe('updateUser', function () {
    context('should be able to update a user', function () {
      it('was able to update user', function (done) {
        db.updateUser({
          'name': 'main',
          'level': 99,
          'experience': 0
        }).then(function (res) {
          expect(res.name).to.eql('main');
          expect(res.level).to.eql(99);
          expect(res.experience).to.eql(0);
          done();
        });
      });
    });
  });
  describe('getUserInfo', function () {
    context('should be able to get user', function () {
      it('was able to get user', function (done) {
        db.getUserInfo().then(function (res) {
          expect(res.name).to.eql('main');
          expect(res.level).to.eql(99);
          expect(res.experience).to.eql(0);
          done();
        });
      });
    });
  });
  describe('deleteUser', function () {
    context('should be able to remove user', function () {
      it('was able to remove user', function (done) {
        db.deleteUser().then(function (res) {
          expect(res).to.eql(true);
          done();
        });
      });
    });
  });
  describe('getUserInfo - after', function () {
    context('should not be able to find user so it makes one', function () {
      it('was able to make user', function (done) {
        db.getUserInfo().then(function (res) {
          expect(res.name).to.eql('main');
          expect(res.level).to.eql(1);
          expect(res.experience).to.eql(0);
          done();
        });
      });
    });
  });
  describe('deleteUser - after', function () {
    context('should be able to remove user', function () {
      it('was able to remove user', function (done) {
        db.deleteUser().then(function (res) {
          expect(res).to.eql(true);
          done();
        });
      });
    });
  });
});
