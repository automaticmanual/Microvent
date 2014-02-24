define([
  'Gizmo'
], function(Base) {

  /**
   * Event module.
   *
   * @extends {Gizmo}
   * @exports Microvent/patterns/event/Event
   */
  var Event = {
    
    /**
     * Object factory.
     * 
     * @param  {!String} type
     * @param  {!Object} target
     * @param  {!Object} emitter
     * @param  {!Function} listener
     * @return {!Microvent/patterns/event/Event}
     */
    construct: function(type, target, emitter, listener) {
      var event = {
        
        /**
         * Type of event.
         * 
         * @type {String}
         */
        type: type || '',

        /**
         * Event target. This is usually the EventEmitters target.
         * 
         * @type {*}
         */
        target: target,
        
        /**
         * The event target thats handeling this event.
         * 
         * @type {Microvent/patterns/event/EventEmitter}
         */
        emitter: emitter,
        
        /**
         * The listener currently handling this event.
         * 
         * @type {Function}
         */
        listener: listener,
        
        /**
         * Timestamp this event step got executed.
         * 
         * @type {Number}
         */
        timeStamp: Date.now(),
        
        /**
         * Tracks event propagation.
         * 
         * @type {Boolean}
         */
        _propagating: true
      };

      return this.extend(event);
    },

    /**
     * Stops event propagation of event above.
     * 
     * @return {!This}
     */
    stop: function() {
      this._propagating = false;

      return this;
    },

    /**
     * Determines if event is still propagating.
     * 
     * @return {!Boolean}
     */
    isPropagating: function() {
      return this._propagating;
    }
  };

  return  Base.extend(Event);
});