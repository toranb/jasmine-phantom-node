var fs = require('fs');

FileSystem = (function() {

  var FileSystemObject = function(params) {
    this.directories = params.directories;
  };

  FileSystemObject.prototype.getPhantomRunnerHtmlPage = function(file) {
    return fs.readFileSync('phantom-runner.html').toString();
  };

  FileSystemObject.prototype.isFile = function(file) {
    if (file.indexOf('.') >= 0) {
      return true;
    }
    return false;
  };

  FileSystemObject.prototype.isJsSpecFile = function(file) {
    if (file.indexOf('.spec.js') >= 0) {
      return true;
    }
    return false;
  };

  FileSystemObject.prototype.traverseFileSystem = function(scripts, directory) {
    this.traverseFileSystemAppendingScripts(scripts, directory);
    return scripts;
  };

  FileSystemObject.prototype.traverseFileSystemAppendingScripts = function(scripts, directory) {
    var that = this;
    fs.readdirSync(directory).forEach(function(file) {
      if (that.isFile(file) && that.isJsSpecFile(file)) {
        that.appendJavascript(scripts, file, directory);
      } else if (that.isFile(file) && !that.isJsSpecFile(file)) {
        return;
      } else {
        that.traverseFileSystem(scripts, directory + '/' + file);
      }
    });
  };

  FileSystemObject.prototype.appendJavascript = function(scripts, file, directory) {
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
