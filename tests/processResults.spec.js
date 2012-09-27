require('../lib/processResults');
require('../lib/cli');

describe("logWithColor Tests", function() {

  var sut, logSpy, data;

  beforeEach(function(){
    sut = new ProcessResults({showColor:true, debugOn:false});
    logSpy = spyOn(ProcessResults.prototype, 'log');
    data = {red:function(){}, green: function(){}};
  });

  it("logs with red color when status is error", function() {
    sut.logWithColor(data, 1);
    expect(logSpy).toHaveBeenCalledWith(data.red);
  });

  it("logs with green color when status is not error", function() {
    sut.logWithColor(data, 0);
    expect(logSpy).toHaveBeenCalledWith(data.green);
  });

});

describe("determineResultsStatus Tests", function() {

  var sut;

  beforeEach(function(){
    sut = new ProcessResults({showColor:true, debugOn:false});
  });

  it("returns error status when passing text not found", function() {
    result = sut.determineResultsStatus("foobar");
    expect(result).toEqual(1);
  });

  it("returns successful status when passing text found", function() {
    result = sut.determineResultsStatus("All tests passed!");
    expect(result).toEqual(0);
  });

});

describe("logResultsToTheConsole Tests", function() {

  var sut, exitSpy, result, logWithColorSpy, logSpy;

  beforeEach(function(){
    result = "foo";
    sut = new ProcessResults({showColor:true, debugOn:false});
    exitSpy = spyOn(ProcessResults.prototype, 'exit');
    logSpy = spyOn(ProcessResults.prototype, 'log');
    logWithColorSpy = spyOn(ProcessResults.prototype, 'logWithColor');
  });

  it("invokes determineResultsStatus with result", function() {
    var statusSpy = spyOn(ProcessResults.prototype, 'determineResultsStatus');
    sut.logResultsToTheConsole(result);
    expect(statusSpy).toHaveBeenCalledWith(result);
  });

  it("invokes logWithColor when showColor true", function() {
    sut.showColor = true;
    sut.logResultsToTheConsole(result);
    expect(logWithColorSpy).toHaveBeenCalledWith(result, 1);
  });

  it("does not invoke log directly when showColor true", function() {
    sut.showColor = true;
    sut.logResultsToTheConsole(result);
    expect(logSpy).not.toHaveBeenCalledWith(jasmine.any(String));
  });

  it("invokes log when showColor false", function() {
    sut.showColor = false;
    sut.logResultsToTheConsole(result);
    expect(logSpy).toHaveBeenCalledWith(result);
  });

  it("does not invoke logWithColor directly when showColor false", function() {
    sut.showColor = false;
    sut.logResultsToTheConsole(result);
    expect(logWithColorSpy).not.toHaveBeenCalledWith(jasmine.any(String), 0);
  });

  it("invokes exit with status code when debug false", function() {
    var statusSpy = spyOn(ProcessResults.prototype, 'determineResultsStatus').andReturn(0);
    sut.debugOn = false;
    sut.logResultsToTheConsole(result);
    expect(exitSpy).toHaveBeenCalledWith(0);
  });

  it("does not invoke exit with status code when debug true", function() {
    var statusSpy = spyOn(ProcessResults.prototype, 'determineResultsStatus').andReturn(0);
    sut.debugOn = true;
    sut.logResultsToTheConsole(result);
    expect(exitSpy).not.toHaveBeenCalledWith(0);
  });
});
