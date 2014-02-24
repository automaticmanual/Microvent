define([
  'Microvent/patterns/event/EventEmitter',
  'Microvent/Microvent'
], function(EventEmitter, Microvent) {

  describe('Microvent/Microvent', function() {
    describe('Microvent/Microvent', function() {
      it('Should be an EventEmitter.', function() {
        Microvent.instanceOf(EventEmitter).should.be.true;
      });
    });
  });
});