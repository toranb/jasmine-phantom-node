ExpressConfiguration = (function() {

  var ExpressConfigurationObject = function(params) {
    this.directories = params.directories;
  };

  ExpressConfigurationObject.prototype.determineProjectRoot = function(directory) {
    return directory.substring(0, directory.indexOf('/node_modules'));
  };

  ExpressConfigurationObject.prototype.determineAppPath = function(directory) {
    var root = directory.indexOf('/');
    return directory.substring(0, root);
  };

  ExpressConfigurationObject.prototype.makeStaticDirectoriesAvailable = function(app, express) {
    for(i = 0; i < this.directories.length; i++) {
      var project = this.determineProjectRoot(__dirname);
      var path = this.determineAppPath(this.directories[i]);
      var static = express.static(project+'/'+path);
      app.use(static);
    }
  };

  return ExpressConfigurationObject;
})();
