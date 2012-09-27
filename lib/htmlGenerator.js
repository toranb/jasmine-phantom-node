HtmlGenerator = (function() {

  var HtmlGeneratorObject = function() {
  };

  HtmlGeneratorObject.prototype.getJasmineTrivialReporterScript = function() {
    return '<script type="text/javascript">var trivialReporter = new jasmine.TrivialReporter();jasmine.getEnv().addReporter(trivialReporter);jasmine.getEnv().execute();</script>';
  };

  HtmlGeneratorObject.prototype.getClosingHtml = function() {
    return '</html>';
  };

  HtmlGeneratorObject.prototype.getJasmineHtmlRunnerMarkup = function() {
    return this.getJasmineTrivialReporterScript() + this.getClosingHtml();
  };

  return HtmlGeneratorObject;
})();
