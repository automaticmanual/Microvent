define([
  'Gizmo',
  '../helpers/Dot'
], function(Base, Dot) {

  /**
   * A basic registry collection type.
   * 
   * @extends {Gizmo}
   * @exports Microvent/patterns/Registery
   */
  var Registry = {
    
    /**
     * Object factory
     * 
     * @return {!Microvent/patterns/Registry}
     */
    construct: function() {
      var registry = {

        /**
         * Internal registry hash.
         * 
         * @type {Object}
         */
        _registry: {}
      };
      
      return this.extend(registry);
    },

    /**
     * Registers an item. Will overwrite any items already registered.
     * 
     * @param  {!String} name
     * @param  {!*} item
     * @return {!This}
     */
    set: function(name, item) {
      this._registry[name] = item;

      return this;
    },

    /**
     * Removes an item by name.
     * 
     * @param  {!String} name
     * @return {!This}
     */
    remove: function(name) {
      delete this._registry[name];

      return this;
    },

    /**
     * Determines if an item name exists in registery.
     * 
     * @param  {!String} name
     * @return {!Boolean}
     */
    has: function(name) {
      return Dot.exists(this.get(name));
    },

    /**
     * Gets an item from registry by name.
     * 
     * @param  {!String} name
     * @return {?*}
     */
    get: function(name) {
      return this._registry[name];
    },

    /**
     * Get the keys of all items current registered.
     * 
     * @return {!Array}
     */
    keys: function() {
      return Dot.keys(this._registry);
    }
  };

  return  Base.extend(Registry);
});