require('../lib/cli');

describe("parseCommandLineArgs Tests", function() {

  it("halt invoked when no arguments found", function() {
    var haltSpy = spyOn(Cli.prototype, 'haltProcessWithUsage');
    var getSpy = spyOn(Cli.prototype, 'getAvailableParams');
    var sut = new Cli({args:[]});
    sut.parseCommandLineArgs();
    expect(haltSpy).toHaveBeenCalledWith();
  });

  it("halt not invoked when command line arguments found", function() {
    var haltSpy = spyOn(Cli.prototype, 'haltProcessWithUsage');
    var sut = new Cli({args:['foo/spec']});
    sut.parseCommandLineArgs();
    expect(haltSpy).not.toHaveBeenCalledWith();
  });

  it("getAvailableParams invoked when command line arguments found", function() {
    var haltSpy = spyOn(Cli.prototype, 'haltProcessWithUsage');
    var getSpy = spyOn(Cli.prototype, 'getAvailableParams').andReturn({showColor:true,showReport:false,runSpecs:['foo/spec']});
    var sut = new Cli({args:['foo/spec']});
    sut.parseCommandLineArgs();
    expect(getSpy).toHaveBeenCalledWith();
  });

  it("getAvailableParams not invoked when no arguments found", function() {
    var haltSpy = spyOn(Cli.prototype, 'haltProcessWithUsage');
    var getSpy = spyOn(Cli.prototype, 'getAvailableParams');
    var sut = new Cli({args:[]});
    sut.parseCommandLineArgs();
    expect(getSpy).not.toHaveBeenCalledWith();
  });

  it("halt invoked when available params has no specs to run", function() {
    var haltSpy = spyOn(Cli.prototype, 'haltProcessWithUsage');
    var sut = new Cli({args:['--noColor']});
    sut.parseCommandLineArgs();
    expect(haltSpy).toHaveBeenCalledWith();
  });

  it("halt not invoked when available params has specs to run", function() {
    var haltSpy = spyOn(Cli.prototype, 'haltProcessWithUsage');
    var sut = new Cli({args:['--noColor', '--junitreport', 'foo/spec']});
    sut.parseCommandLineArgs();
    expect(haltSpy).not.toHaveBeenCalledWith();
  });

  it("returns cli param object when available params have specs to run", function() {
    var sut = new Cli({args:['--noColor', '--junitreport', 'foo/spec', 'bar/bazz']});
    var result = sut.parseCommandLineArgs();
    expect(result).toEqual({
      showColor:false,
      showReport:true,
      debugOn:false,
      runSpecs:['foo/spec', 'bar/bazz'],
      compileCoffee:false
    });
  });

});

describe("getAvailableParams Tests", function() {

  it("coffee is false without the command line argument present", function() {
    var sut = new Cli({args:['foo/spec']});
    var params = sut.getAvailableParams();
    expect(params.compileCoffee).toBe(false);
  });

  it("coffee is true when the command line argument present", function() {
    var sut = new Cli({args:['--coffee', 'foo/spec']});
    var params = sut.getAvailableParams();
    expect(params.compileCoffee).toBe(true);
  });

  it("showColor is true without the command line argument present", function() {
    var sut = new Cli({args:['foo/spec']});
    var params = sut.getAvailableParams();
    expect(params.showColor).toBe(true);
  });

  it("showReport is false without the command line argument present", function() {
    var sut = new Cli({args:['foo/spec']});
    var params = sut.getAvailableParams();
    expect(params.showReport).toBe(false);
  });

  it("runSpecs returns spec directory when the command line argument is available", function() {
    var sut = new Cli({args:['foo/spec']});
    var params = sut.getAvailableParams();
    expect(params.runSpecs).toEqual(['foo/spec']);
  });

  it("runSpecs returns list of directories if multiple exist on the command line", function() {
    var sut = new Cli({args:['foo/spec', 'bar/bazz']});
    var params = sut.getAvailableParams();
    expect(params.runSpecs).toEqual(['foo/spec','bar/bazz']);
  });

  it("showColor is false with the command line argument noColor", function() {
    var sut = new Cli({args:['--noColor', 'foo/spec']});
    var params = sut.getAvailableParams();
    expect(params.showColor).toBe(false);
  });

  it("showColor is false even when the junitreport command line argument is before it", function() {
    var sut = new Cli({args:['--junitreport', '--noColor', 'foo/spec']});
    var params = sut.getAvailableParams();
    expect(params.showColor).toBe(false);
  });

  it("debugOn is false without a specific command line argument available", function() {
    var sut = new Cli({args:['--junitreport', '--noColor', 'foo/spec']});
    var params = sut.getAvailableParams();
    expect(params.debugOn).toBe(false);
  });

  it("debugOn is set to true when the command line argument is found", function() {
    var sut = new Cli({args:['--junitreport', '--noColor', '--debug', 'foo/spec']});
    var params = sut.getAvailableParams();
    expect(params.debugOn).toBe(true);
  });

  it("runSpecs returns spec directory even when noColor command line argument available", function() {
    var sut = new Cli({args:['--noColor', 'foo/spec']});
    var params = sut.getAvailableParams();
    expect(params.runSpecs).toEqual(['foo/spec']);
  });

  it("runSpecs returns list of directories if multiple exist on the command line after noColor argument", function() {
    var sut = new Cli({args:['--noColor', 'foo/spec', 'bar/bazz']});
    var params = sut.getAvailableParams();
    expect(params.runSpecs).toEqual(['foo/spec','bar/bazz']);
  });

  it("showReport is true with the command line argument junitreport", function() {
    var sut = new Cli({args:['--junitreport', 'foo/spec']});
    var params = sut.getAvailableParams();
    expect(params.showReport).toBe(true);
  });

  it("showReport is true even with a noColor command line argument before it", function() {
    var sut = new Cli({args:['--noColor', '--junitreport', 'foo/spec']});
    var params = sut.getAvailableParams();
    expect(params.showReport).toBe(true);
  });
});
