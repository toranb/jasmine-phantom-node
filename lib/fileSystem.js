var fs = require('fs')
, recurse = require('./recurseDirectory');

FileSystem = (function() {

  var FileSystemObject = function(params) {
    this.directories = params.directories;
    this.recurse = new RecurseDirectory(this);
  };

  FileSystemObject.prototype.getPhantomRunnerHtmlPage = function(file) {
    return fs.readFileSync('phantom-runner.html').toString();
  };

  FileSystemObject.prototype.isJsSpecFile = function(file) {
    if (file.indexOf('.spec.js') >= 0) {
      return true;
    }
    return false;
  };

  FileSystemObject.prototype.traverseFileSystem = function() {
    var scripts = arguments[arguments.length - 2];
    var directory = arguments[arguments.length - 1];
    var success = this.appendJavascript;
    var retry = this.traverseFileSystem;
    var compare = this.isJsSpecFile;
    var params = {extra:scripts, directory:directory, success:success, retry:retry, compare:compare};
    this.recurse.traverseFileSystemWithCallbacks(params);
    return scripts;
  };

  FileSystemObject.prototype.appendJavascript = function() {
    var scripts = arguments[0];
    var file = arguments[1];
    var directory = arguments[2];
    root = directory.indexOf('/');
    baseUrl = directory.substring(root, directory.length);
    scripts.push('<script src="' + baseUrl + '/'+ file + '"></script>');
  };

  FileSystemObject.prototype.getScriptsForEachJasmineSpec = function() {
    var html = "";
    var that = this;
    var scripts = [];
    for(i = 0; i < that.directories.length; i++) {
      var javascript = that.traverseFileSystem(scripts, that.directories[i]);
      for(j = 0; j < javascript.length; j++){
        html += javascript[j];
      }
    }
    return html;
  };

  return FileSystemObject;
})();
