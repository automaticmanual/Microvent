define([
  'Microvent/patterns/event/Event'
], function(Event) {

  describe('Microvent/patterns/event/Event', function() {
    var event, emitter;

    beforeEach(function() {
      emitter = {
        data: 'data'
      };

      event = Event.construct('saved', emitter);
    });

    describe('#construct', function() {
      it('Should allow value overwrite.', function() {
        event.type.should.equal('saved');
        event.target.should.deep.equal(emitter);
      });

      it('Should construct a time stamp.', function() {
        event.timeStamp.should.be.a('number');
      });
    });

    describe('#isPropagating', function() {
      it('Should propagate by default.', function() {
        event.isPropagating().should.equal.true;
      });

      it('Should be false when stopped.', function() {
        event.stop();

        event.isPropagating().should.be.false;
      });
    });

    describe('#stop', function() {
      it('Should return self.', function() {
        event.stop().should.deep.equal(event);
      });

      it('Should stop propagation.', function() {
        event.stop().isPropagating().should.be.false;
      });
    });
  });
});