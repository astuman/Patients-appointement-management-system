var expect = require('chai').expect;
var check = require('../src/index.js');

describe('CheckDate', () => {
  describe('checkDate()', () => {
    it('return true when date is 28/02/2017', (done) => {
      check.checkDate('28/02/2017', (err, isCheck) => {
        expect(err).to.equal(null);
        expect(isCheck).to.equal(true);
        done();
      });
    });

    it('return false when date is 29/02/2017', (done) => {
      check.checkDate('29/02/2017', (err, isCheck) => {
        expect(err).to.equal(null);
        expect(isCheck).to.equal(false);
        done();
      });
    });

    it('return error when input is not date', (done) => {
      check.checkDate('dd/02/2017', (err, isCheck) => {
        expect(err).to.not.equal(null);
        expect(err.message).to.equal('input must be a type date');
        expect(isCheck).to.equal(false);
        done();
      });
    });

    it('return error when input is not date', (done) => {
      check.checkDate('ddmmyyyy', (err, isCheck) => {
        expect(err).to.not.equal(null);
        expect(err.message).to.equal('input must be a type date');
        expect(isCheck).to.equal(false);
        done();
      });
    });

    it('return false when date is 32/13/2017', (done) => {
      check.checkDate('32/13/2017', (err, isCheck) => {
        expect(err).to.equal(null);
        expect(isCheck).to.equal(false);
        done();
      });
    });

    it('return false when date is 2017/11/15', (done) => {
      check.checkDate('32/13/2017', (err, isCheck) => {
        expect(err).to.equal(null);
        expect(isCheck).to.equal(false);
        done();
      });
    });

  });
});
