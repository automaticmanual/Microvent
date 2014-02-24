(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('Microvent', [], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.Microvent = factory();
  }
}(this, function () {