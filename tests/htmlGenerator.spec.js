require('../lib/htmlGenerator');

describe("getJasmineHtmlRunnerMarkup Tests", function() {

  var sut, scriptSpy, closingSpy;

  beforeEach(function(){
    sut = new HtmlGenerator({'directories':null});
    scriptSpy = spyOn(sut, 'getJasmineTrivialReporterScript').andReturn('<foo />');
    closingSpy = spyOn(sut, 'getClosingHtml').andReturn('<bar />');
  });

  it("invokes the getJasmineTrivialReporterScript method", function() {
    sut.getJasmineHtmlRunnerMarkup();
    expect(scriptSpy).toHaveBeenCalledWith();
  });

  it("invokes the getJasmineTrivialReporterScript method", function() {
    sut.getJasmineHtmlRunnerMarkup();
    expect(closingSpy).toHaveBeenCalledWith();
  });

  it("returns combined closing markup", function() {
    var markup = sut.getJasmineHtmlRunnerMarkup();
    expect(markup).toBe('<foo /><bar />');
  });

});

describe("getJasmineTrivialReporterScript Tests", function() {

  it("returns the trivial reporter javascript", function() {
    var sut = new HtmlGenerator({'directories':null});
    expectedReporterScriptMarkup = '<script type="text/javascript">var trivialReporter = new jasmine.TrivialReporter();jasmine.getEnv().addReporter(trivialReporter);jasmine.getEnv().execute();</script>';
    html = sut.getJasmineTrivialReporterScript();
    expect(html).toBe(expectedReporterScriptMarkup);
  });

});

describe("getClosingHtml Tests", function() {

  it("returns the closing html", function() {
    var sut = new HtmlGenerator({'directories':null});
    expectedClosingHtml = '</body></html>';
    html = sut.getClosingHtml();
    expect(html).toBe(expectedClosingHtml);
  });

});
