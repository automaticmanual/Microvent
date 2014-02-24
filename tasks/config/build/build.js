var fs, amdclean, config;

fs = require('fs');
amdclean = require('amdclean');

config = {
  taskName: 'requirejs.complile',
  options: {
    name: 'src/Microvent',
    out: 'bin/microvent.min.js',
    paths: {
      Gizmo: 'lib/my-gizmo/bin/gizmo.min'
    },
    onModuleBundleComplete: function (data) {
      var outputFile = data.path;

      fs.writeFileSync(outputFile, amdclean.clean({
        code: fs.readFileSync(outputFile),
        wrap: {
          start: fs.readFileSync(__dirname + '/start.frag').toString(),
          end: fs.readFileSync(__dirname + '/end.frag').toString()
        }
      }));
    }
  }
};

module.exports = config;