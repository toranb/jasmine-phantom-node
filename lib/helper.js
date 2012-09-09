var express = require('express')
, fs = require('fs');

Helper = (function() {

  var HelperObject = function(params) {
    this.directories = params.directories;
  };

  HelperObject.prototype.addStaticDirectoryForEachSpec = function(app) {
    for(i = 0; i < this.directories.length; i++) {
      var root = this.directories[i].indexOf('/');
      var project = __dirname.substring(0, __dirname.indexOf('/node_modules'));
      app.use(express.static(project+'/'+this.directories[i].substring(0, root)));
    }
  };

  HelperObject.prototype.isFile = function(file) {
    if (file.indexOf('.') >= 0) {
      return true;
    }
    return false;
  };

  HelperObject.prototype.isJsSpecFile = function(file) {
    if (file.indexOf('.spec.js') >= 0) {
      return true;
    }
    return false;

  };

  HelperObject.prototype.traverseFileSystem = function(scripts, directory) {
    var that = this;
    fs.readdirSync(directory).forEach(function(file) {
      if (that.isFile(file) && that.isJsSpecFile(file)) {
        root = directory.indexOf('/');
        baseUrl = directory.substring(root, directory.length);
        scripts.push('<script src="' + baseUrl + '/'+ file + '"></script>');
      } else if (that.isFile(file) && !that.isJsSpecFile(file)) {
        return;
      } else {
        that.traverseFileSystem(scripts, directory + '/' + file);
      }
    });

  };

  HelperObject.prototype.generateHtmlScriptTags = function(html) {
    var that = this;
    var scriptTags = "";
    for(i = 0; i < this.directories.length; i++) {
      var scripts = new Array();
      that.traverseFileSystem(scripts, that.directories[i]);
      for(j = 0; j < scripts.length; j++){
        scriptTags += scripts[j];
      }
    }
    return scriptTags;
  };

  HelperObject.prototype.generateJasmineRunnerHtml = function() {
    var html = fs.readFileSync('phantom-runner.html').toString();
    html += this.generateHtmlScriptTags(html);
    html += '<script type="text/javascript">var trivialReporter = new jasmine.TrivialReporter();jasmine.getEnv().addReporter(trivialReporter);jasmine.getEnv().execute();</script></body></html>';
    return html;
  };

  return HelperObject;
})();
