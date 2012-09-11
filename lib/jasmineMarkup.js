require('./htmlGenerator');
require('./fileSystem');

JasmineMarkup = (function() {

  var JasmineMarkupObject = function(params) {
    this.directories = params.directories;
    this.htmlGenerator = new HtmlGenerator();
    this.fileSystem = new FileSystem({'directories':this.directories});
  };

  JasmineMarkupObject.prototype.generateHtmlPage = function() {
    var html = this.fileSystem.getPhantomRunnerHtmlPage();
    html += this.fileSystem.getScriptsForEachJasmineSpec();
    html += this.htmlGenerator.getJasmineHtmlRunnerMarkup();
    return html;
  };

  return JasmineMarkupObject;
})();
