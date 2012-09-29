var fs = require('fs');

RecurseDirectory = (function() {

  var RecurseDirectoryObject = function(callback) {
    this.callback = callback;
  };

  RecurseDirectoryObject.prototype.isFile = function(file) {
    if (file.indexOf('.') >= 0) {
      return true;
    }
    return false;
  };

  RecurseDirectoryObject.prototype.traverseFileSystemWithCallbacks = function() {
    var that = this;
    var extra = arguments[0].extra;
    var directory = arguments[0].directory;
    var success = arguments[0].success;
    var retry = arguments[0].retry;
    var compare = arguments[0].compare;
    fs.readdirSync(directory).forEach(function(file) {
      if (that.isFile(file) && compare.apply(that.callback, [file])) {
        success.apply(that.callback, [extra, file, directory]);
      } else if (that.isFile(file) && !compare.apply(that.callback, [file])) {
        return;
      } else {
        retry.apply(that.callback, [extra, directory + '/' + file]);
      }
    });
  };

  return RecurseDirectoryObject;
})();
