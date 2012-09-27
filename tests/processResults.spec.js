require('../lib/processResults');

describe("logWithColor Tests", function() {

  var sut;

  beforeEach(function(){
    sut = new ProcessResults();
  });

  it("logs with red color when status is error", function() {
    var logSpy = spyOn(ProcessResults.prototype, 'log');
    var data = {red:function(){}, green: function(){}};
    sut.logWithColor(data, 1);
    expect(logSpy).toHaveBeenCalledWith(data.red);
  });

  it("logs with green color when status is not error", function() {
    var logSpy = spyOn(ProcessResults.prototype, 'log');
    var data = {red:function(){}, green: function(){}};
    sut.logWithColor(data, 0);
    expect(logSpy).toHaveBeenCalledWith(data.green);
  });

});

describe("determineResultsStatus Tests", function() {

  var sut;

  beforeEach(function(){
    sut = new ProcessResults();
  });

  it("returns error status when passing text not found", function() {
    data = "foobar";
    result = sut.determineResultsStatus(data);
    expect(result).toEqual(1);
  });

  it("returns successful status when passing text found", function() {
    data = "All tests passed!";
    result = sut.determineResultsStatus(data);
    expect(result).toEqual(0);
  });

});

describe("logResultsToTheConsole Tests", function() {

  var sut, exitSpy;

  beforeEach(function(){
    sut = new ProcessResults();
    exitSpy = spyOn(ProcessResults.prototype, 'exit');
  });

  it("invokes determineResultsStatus with result", function() {
    var result = "foo";
    var statusSpy = spyOn(ProcessResults.prototype, 'determineResultsStatus');
    var logSpy = spyOn(ProcessResults.prototype, 'log');
    sut.logResultsToTheConsole(result, false);
    expect(statusSpy).toHaveBeenCalledWith(result);
  });

  it("invokes logWithColor when showColor true", function() {
    var result = "foo";
    var statusSpy = spyOn(ProcessResults.prototype, 'determineResultsStatus').andReturn(0);
    var logWithColorSpy = spyOn(ProcessResults.prototype, 'logWithColor');
    sut.logResultsToTheConsole(result, true);
    expect(logWithColorSpy).toHaveBeenCalledWith(result, 0);
  });

  it("does not invoke log directly when showColor true", function() {
    var result = "foo";
    var statusSpy = spyOn(ProcessResults.prototype, 'determineResultsStatus').andReturn(0);
    var logWithColorSpy = spyOn(ProcessResults.prototype, 'logWithColor');
    var logSpy = spyOn(ProcessResults.prototype, 'log');
    sut.logResultsToTheConsole(result, true);
    expect(logSpy).not.toHaveBeenCalledWith(jasmine.any(String));
  });

  it("invokes log when showColor false", function() {
    var result = "foo";
    var logSpy = spyOn(ProcessResults.prototype, 'log');
    sut.logResultsToTheConsole(result, false);
    expect(logSpy).toHaveBeenCalledWith(result);
  });

  it("does not invoke logWithColor directly when showColor false", function() {
    var result = "foo";
    var statusSpy = spyOn(ProcessResults.prototype, 'determineResultsStatus').andReturn(0);
    var logWithColorSpy = spyOn(ProcessResults.prototype, 'logWithColor');
    var logSpy = spyOn(ProcessResults.prototype, 'log');
    sut.logResultsToTheConsole(result, false);
    expect(logWithColorSpy).not.toHaveBeenCalledWith(jasmine.any(String), 0);
  });

  it("invokes exit with status code", function() {
    var statusSpy = spyOn(ProcessResults.prototype, 'determineResultsStatus').andReturn(0);
    var logWithColorSpy = spyOn(ProcessResults.prototype, 'logWithColor');
    sut.logResultsToTheConsole(result, true);
    expect(exitSpy).toHaveBeenCalledWith(0);
  });
});
