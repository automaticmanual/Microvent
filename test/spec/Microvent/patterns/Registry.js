define([
  'Microvent/patterns/Registry'
], function(Registry) {

  describe('Microvent/patterns/Registry', function() {
    var registry;

    beforeEach(function() {
      registry = Registry.construct();
    });

    describe('#set', function() {
      it('Should return self.', function() {
        registry.set().should.equal(registry);
      });

      it('Should set item to registry.', function() {
        registry
          .set('item', 'item')
          .has('item').should.be.true;
      });
    });

    describe('#remove', function() {
      it('Should return self.', function() {
        registry.remove().should.equal(registry);
      });

      it('Should remove an item from registry.', function() {
        registry
          .set('item', 'item')
          .remove('item')
          .has('item').should.be.false;
      });
    });

    describe('#has', function() {
      it('Should determine if item exists.', function() {
        registry.has('item').should.be.false;
        registry.set('item', 'item').has('item').should.be.true;
      });
    });

    describe('#get', function() {
      it('Should get an item if exists.', function() {
        should.not.exist(registry.get('item'));

        registry
          .set('item', 'item')
          .get('item').should.equal('item');
      });
    });
    
    describe('#keys', function() {
      it('Should return all registered item keys.', function() {
        registry.keys().should.be.empty;

        registry
          .set('item', 'item')
          .set('cat', 'ronyy')
          .keys().should.have.members(['item', 'cat']);
      });
    });
  });
});