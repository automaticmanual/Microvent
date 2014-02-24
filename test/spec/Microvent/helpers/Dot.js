define([
  'Microvent/helpers/Dot'
], function(Dot) {

  describe('Microvent/helpers/Dot', function() {
    var array, object;

    beforeEach(function() {
      array = ['key', 'cat'];

      object = {
        'key': 'value',
        'cat': 'ronny'
      };
    });

    describe('#keys', function() {
      it('Should return a list of object keys.', function() {
        Dot.keys(object).should.have.length(2);
        Dot.keys(object).should.have.members(['key', 'cat']);
      });
    });

    describe('#exists', function() {
      it('Should return true for all existing items.', function() {
        Dot.exists('').should.be.true;
        Dot.exists(0).should.be.true;
        Dot.exists(false).should.be.true;
      });

      it('Should return false for all non-existant items.', function() {
        Dot.exists().should.be.false;
        Dot.exists(null).should.be.false;
        Dot.exists(undefined).should.be.false;
      });
    });

    describe('#remove', function() {
      it('Should return array.', function() {
        var result = Dot.remove(array, 'cat');

        result.should.be.an('array');
      });

      it('Should remove a single item.', function() {
        var result = Dot.remove(array, 'cat');

        result.should.have.length(1);
        result.should.contain('key');
      });
    });
  });
});