var fs = require('fs')
, coffeeScript = require('coffee-script')
, recurse = require('./recurseDirectory');

Coffee = (function() {

  var CoffeeObject = function(params) {
    this.directories = params.directories;
    this.recurse = new RecurseDirectory(this);
  };

  CoffeeObject.prototype.isCoffeeFile = function(file) {
    if (file.indexOf('.spec.coffee') >= 0) {
      return true;
    }
    return false;
  };

  CoffeeObject.prototype.compileToJavaScriptSpec = function() {
    var file = arguments[1];
    var directory = arguments[2];
    var filename = directory + "/" + file;
    var data = fs.readFileSync(filename, 'utf8');
    var spec = coffeeScript.compile(data);
    var newfilename = directory + "/" + file.replace(".coffee",".js");
    fs.writeFileSync(newfilename, spec);
  };

  CoffeeObject.prototype.traverseFileSystem = function() {
    var directory = arguments[arguments.length - 1];
    var success = this.compileToJavaScriptSpec;
    var retry = this.traverseFileSystem;
    var compare = this.isCoffeeFile;
    var params = {extra:null, directory:directory, success:success, retry:retry, compare:compare};
    this.recurse.traverseFileSystemWithCallbacks(params);
  };

  CoffeeObject.prototype.compileEachCoffeeSpecFile = function() {
    var that = this;
    for(i = 0; i < that.directories.length; i++) {
      that.traverseFileSystem(that.directories[i]);
    }
  };

  return CoffeeObject;
})();
