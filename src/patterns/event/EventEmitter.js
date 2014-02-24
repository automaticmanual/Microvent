define([
  'Gizmo',
  '../../helpers/Dot',
  '../Registry',
  './Event'
],function(Base, Dot, Registry, Event) {


  /**
   * EventEmitter module.
   * 
   * @extends {Gizmo}
   * @exports Microvent/patterns/event/EventEmitter
   */
  var EventEmitter = {
    
    /**
     * Object factory.
     * 
     * @param  {*=} target
     * @return {!Microvent/patterns/event/EventEmitter}
     */
    construct: function(target) {
      var emitter = {

        /**
         * Internal event target.
         * 
         * @type {*}
         */
        _target: target,

        /**
         * Internal event registry.
         * 
         * @type {Microvent/patterns/Registry}
         */
        _registry: Registry.construct()
      };
      
      return this.extend(emitter);
    },

    /**
     * Get current target.
     * 
     * @return {!*}
     */
    getTarget: function() {
      return this._target || this;
    },

    /**
     * Binds an event.
     * 
     * @param  {!String} event
     * @param  {!Function} listener
     * @return {!This}
     */
    on: function(event, listener) {
      var listeners = this._registry.get(event) || [];

      listeners.push(listener);

      this._registry.set(event, listeners);

      return this;
    },

    /**
     * Binds event once then removes listener.
     * 
     * @param  {!String} event
     * @param  {!Function} listener
     * @return {!This}
     */
    once: function(event, listener) {
      var handler = function(event, data) {
        listener(event, data);

        this.off(event.type, handler);
      }.bind(this);

      return this.on(event, handler);
    },

    /**
     * Removes a listener or all listeners from event.
     * 
     * @param  {!String} event
     * @param  {Funct=} listener
     * @return {!This}
     */
    off: function(event, listener) {
      var listeners = this._registry.get(event) || [];

      if(!listener) {
        this._registry.remove(event);
      } else {
        this._registry.set(event, Dot.remove(listeners, listener));
      }
        
      return this;
    },

    /**
     * Returns list of all events bound.
     * 
     * @return {!Array<String>}
     */
    events: function() {
      return this._registry.keys();
    },

    /**
     * Removes all events and listenres.
     * 
     * @return {!This}
     */
    unbind: function() {
      this._registry = Registry.construct();

      return this;
    },

    /**
     * Triggers an event and calls all listeners unless stoped.
     * 
     * @param  {!String} event
     * @param  {!*} extra
     * @return {!This}
     */
    trigger: function(event, extra) {
      var listeners = this._registry.get(event) || [];

      for(var index in listeners) {
        var listener, eventObject;

        listener = listeners[index];

        eventObject = Event.construct(event, this.getTarget(), this, listener);

        listener(eventObject, extra);

        if(!eventObject.isPropagating()) {
          break;
        }
      }

      return this;
    }
  };

  return Base.extend(EventEmitter);
});