define([], function() {

  /**
   * Dot module. Simple utility.
   * 
   * @exports Micrvent/helpers/Dot
   */
  var Dot = {
    /**
     * Returns list of keys on collection.
     * 
     * @param {!Collection} collection
     * @returns {!Array<String>}
     */
    keys: Object.keys,

    /**
     * Determines if object exists.
     * 
     * @param  {?*} object
     * @return {!Boolean}
     */
    exists: function(object) {
      return object !== undefined && object !== null;
    },

    /**
     * Removes a single item from an array.
     * 
     * @param  {!Array} array
     * @param  {?*} item
     * @return {!Array}
     */
    remove: function(array, item) {
      var index = array.indexOf(item);

      if(index !== -1) {
        array.splice(index, 1);
      }

      return array;
    }
  };

  return Dot;
});