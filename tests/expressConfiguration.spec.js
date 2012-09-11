require('../lib/expressConfiguration');

describe("determineAppPath Tests", function() {

  it("returns base path when user inputs valid directory", function() {
    var sut = new ExpressConfiguration({'directories':''});
    path = sut.determineAppPath('webapp/static/script/tests');
    expect(path).toBe('webapp');
  });

  it("returns nothing when invalid string input", function() {
    var sut = new ExpressConfiguration({'directories':''});
    path = sut.determineAppPath('/');
    expect(path).toBe('');
  });

});

describe("determineProjectRoot Tests", function() {

  it("returns project root when node modules found in the path", function() {
    var sut = new ExpressConfiguration({'directories':''});
    project = sut.determineProjectRoot('/Users/foo/project/node_modules/jasmine-phantom-node/lib');
    expect(project).toBe('/Users/foo/project');
  });

  it("returns nothing when node_modules not found in the path", function() {
    var sut = new ExpressConfiguration({'directories':''});
    project = sut.determineProjectRoot('/Users/foo/project/jasmine-phantom-node/lib');
    expect(project).toBe('');
  });

});

describe("makeStaticDirectoriesAvailable Tests", function() {

  var app, appSpy, express, expressSpy;

  beforeEach(function(){
    app = new Object({'use': function(){}});
    appSpy = spyOn(app, 'use');
    express = new Object({'static': function(){}});
    expressSpy = spyOn(express, 'static');
  });

  it("invokes determineProjectRoot", function() {
    var sut = new ExpressConfiguration({'directories':['foo']});
    var projectSpy = spyOn(sut, 'determineProjectRoot');
    sut.makeStaticDirectoriesAvailable(app, express);
    expect(projectSpy).toHaveBeenCalledWith(jasmine.any(String));
  });

  it("invokes determineProjectRoot once for each directory", function() {
    var sut = new ExpressConfiguration({'directories':['foo', 'bar']});
    var projectSpy = spyOn(sut, 'determineProjectRoot');
    sut.makeStaticDirectoriesAvailable(app, express);
    expect(projectSpy.callCount).toEqual(2);
  });

  it("invokes determineAppPath with directory name", function() {
    var sut = new ExpressConfiguration({'directories':['foo']});
    var pathSpy = spyOn(sut, 'determineAppPath');
    sut.makeStaticDirectoriesAvailable(app, express);
    expect(pathSpy).toHaveBeenCalledWith('foo');
  });

  it("invokes determineAppPath once for each directory", function() {
    var sut = new ExpressConfiguration({'directories':['foo', 'bar']});
    var pathSpy = spyOn(sut, 'determineAppPath');
    sut.makeStaticDirectoriesAvailable(app, express);
    expect(pathSpy.callCount).toEqual(2);
  });

  it("invokes static on the express object", function() {
    var sut = new ExpressConfiguration({'directories':['foo']});
    var projectSpy = spyOn(sut, 'determineProjectRoot').andReturn('project');
    var pathSpy = spyOn(sut, 'determineAppPath').andReturn('path');
    sut.makeStaticDirectoriesAvailable(app, express);
    expect(expressSpy).toHaveBeenCalledWith('project/path');
  });

  it("invokes static on the express object once for each directory", function() {
    var sut = new ExpressConfiguration({'directories':['foo', 'bar']});
    sut.makeStaticDirectoriesAvailable(app, express);
    expect(expressSpy.callCount).toEqual(2);
  });

  it("invokes app.use with static path", function() {
    var sut = new ExpressConfiguration({'directories':['foo']});
    expressSpy.andReturn('/some/static/path');
    sut.makeStaticDirectoriesAvailable(app, express);
    expect(appSpy).toHaveBeenCalledWith('/some/static/path');
  });

  it("invokes app.use once for each directory", function() {
    var sut = new ExpressConfiguration({'directories':['foo', 'bar']});
    sut.makeStaticDirectoriesAvailable(app, express);
    expect(appSpy.callCount).toEqual(2);
  });

});
