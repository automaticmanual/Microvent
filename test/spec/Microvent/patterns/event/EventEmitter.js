define([
  'Microvent/patterns/event/Event',
  'Microvent/patterns/event/EventEmitter'
], function(Event, EventEmitter) {

  describe('Microvent/patterns/EventEmitter', function() {
    var eventEmitter;

    beforeEach(function() {
      eventEmitter = EventEmitter.construct();
    });

    describe('#construct', function() {
      it('Should pass target agrument.', function() {
        eventEmitter
          .construct('target')
          .getTarget().should.equal('target');
      });
    });

    describe('#getTarget', function() {
      it('Should return current target.', function() {
        EventEmitter.construct('target').getTarget().should.equal('target');
        
        var eventEmitter = EventEmitter.construct();

        eventEmitter.getTarget().should.equal(eventEmitter);
      });
    });

    describe('#on', function() {
      it('Should return self.', function() {
        eventEmitter.on('', function() {}).should.equal(eventEmitter);
      });

      it('Should bind an event.', function(done) {
        eventEmitter.on('event', function() {
          done();
        });

        eventEmitter.trigger('event');
      });
    });

    describe('#once', function() {
      it('Should return self.', function() {
        eventEmitter.once('', function() {}).should.equal(eventEmitter);
      });

      it('Should only fire once and unbind self.', function() {
        var triggerCount = 0;

        eventEmitter.once('event', function() {
          triggerCount++;
        });

        eventEmitter
          .trigger('event')
          .trigger('event');

        triggerCount.should.equal(1);
      });
    });

    describe('#off', function() {
      it('Should return self.', function() {
        eventEmitter.off('event').should.equal(eventEmitter);
      });

      it('Should remove a single event.', function() {
        var handlerCalled, removedCalled, handler, removedHandler;

        removedCalled = false;

        handlerCalled = false;

        handler = function() {
          handlerCalled = true;
        };

        removedHandler = function() {
          removedCalled = true;
        };

        eventEmitter
          .on('event', handler)
          .on('event', removedHandler);

        eventEmitter
          .off('event', removedHandler)
          .trigger('event');

        removedCalled.should.be.false;
        handlerCalled.should.be.true;
      });

      it('Should remove all named events.', function() {
        var handlerCalled, handler, anotherHandler;

        handlerCalled = false;

        handler = function() {
          handlerCalled = true;
        };

        anotherHandler = handler;

        eventEmitter
          .on('event', handler)
          .on('event', anotherHandler);

        eventEmitter
          .off('event')
          .trigger('event');

        handlerCalled.should.be.false;
      });

      it('Should remove event name from registry.', function() {
        eventEmitter
          .on('event')
          .on('event')
          .off('event')
          .events().should.not.contain('event');
      });

      it('Should leave unamed events.', function (done) {
        eventEmitter.on('done', function () {
          done();
        });

        eventEmitter.off('event');

        eventEmitter.trigger('done');
      });
    });

    describe('#events', function() {
      it('Should return list of event names bound.', function() {
        eventEmitter.events().should.deep.equal([]);

        eventEmitter
          .on('event', function() {})
          .on('clickered', function() {})
          .events().should.have.members(['event', 'clickered']);
      });
    });
    
    describe('#trigger', function() {
      it('Should return self.', function() {
        eventEmitter.trigger().should.equal(eventEmitter);
      });

      it('Should trigger an event.', function(done) {
        eventEmitter.on('event', function() {
          done();
        });

        eventEmitter.trigger('event');
      });

      it('Should trigger many events.', function() {
        var called = 0;

        eventEmitter
          .on('event', function() {
            called++;
          })
          .on('event', function() {
            called++;
          })
          .on('error', function() {
            called = -100;
          });

        eventEmitter.trigger('event');

        called.should.equal(2);
      });

      it('Should send an Event object.', function(done) {
        eventEmitter.on('event', function(event) {
          event.instanceOf(Event).should.be.true;

          done();
        });

        eventEmitter.trigger('event');
      });

      it('Should stop propagation.', function(done) {
        eventEmitter
          .on('event', function(event) {
            event.stop();
          })
          .on('event', function() {
            done('Progation not stopped');
          });

        eventEmitter.trigger('event');

        done();
      });

      it('Should send self as Event.target if one isn\'t defined.', function(done) {
        eventEmitter.on('event', function(event) {
          event.target.should.equal(eventEmitter);

          done();
        });

        eventEmitter.trigger('event');
      });

      it('Should send target as Event.target if one is defined.', function(done) {
        var target, eventEmitter;

        target = 'target';

        eventEmitter = EventEmitter.construct(target);

        eventEmitter.on('event', function(event) {
          event.target.should.equal(target);

          done();
        });

        eventEmitter.trigger('event');
      });

      it('Should return self as Event.emitter.', function(done) {
        eventEmitter.on('event', function(event) {
          event.emitter.should.equal(eventEmitter);

          done();
        });

        eventEmitter.trigger('event');
      });

      it('Should return listener as Event.listener.', function(done) {
        var listener = function(event) {
          event.listener.should.equal(listener);

          done();
        };

        eventEmitter
          .on('event', listener)
          .trigger('event');
      });

      it('Should send any supplied data.', function(done) {
        eventEmitter.on('event', function(event, data) {
          data.should.equal('data');

          done();
        });

        eventEmitter.trigger('event', 'data');
      });
    });
    
    describe('#unbind', function() {
      it('Should return self.', function() {
        eventEmitter.unbind().should.deep.equal(eventEmitter);
      });

      it('Should remove all bound events.', function() {
        eventEmitter
          .on('event', function() {})
          .on('clickered', function() {})
          .unbind()
          .events().should.deep.equal([]);
      });
    });
  });
});