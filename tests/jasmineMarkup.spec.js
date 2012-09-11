require('../lib/jasmineMarkup');

describe("generateHtmlPage Tests", function() {

  var sut, htmlGenerator, fileSystem, getRunnerSpy, getHtmlSpy, getScriptsSpy;

  beforeEach(function(){
    htmlGenerator = new Object({'getJasmineHtmlRunnerMarkup':function(){}});
    fileSystem = new Object({'getPhantomRunnerHtmlPage':function(){}, 'getScriptsForEachJasmineSpec':function(){}});
    sut = new JasmineMarkup({'directories':['foo']});
    sut.htmlGenerator = htmlGenerator;
    sut.fileSystem = fileSystem;
    getHtmlSpy = spyOn(fileSystem, 'getPhantomRunnerHtmlPage');
    getScriptsSpy = spyOn(fileSystem, 'getScriptsForEachJasmineSpec');
    getRunnerSpy = spyOn(htmlGenerator, 'getJasmineHtmlRunnerMarkup');
  });

  it("invokes getPhantomRunnerHtmlPage", function() {
    sut.generateHtmlPage();
    expect(getHtmlSpy).toHaveBeenCalledWith();
  });

  it("invokes getScriptsForEachJasmineSpec", function() {
    sut.generateHtmlPage();
    expect(getScriptsSpy).toHaveBeenCalledWith();
  });

  it("invokes getJasmineHtmlRunnerMarkup", function() {
    sut.generateHtmlPage();
    expect(getRunnerSpy).toHaveBeenCalledWith();
  });

});
