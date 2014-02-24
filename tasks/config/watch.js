var config = {
  taskName: 'watch',
  all: {
    files: ['src/**/*.js', 'tasks/**/*.js', 'test/**/*.js', 'fixtures/**/.js'],
    tasks: ['build-tests', 'jshint'],
    options: {
      livereload: true
    }
  }
};
        
module.exports = config;