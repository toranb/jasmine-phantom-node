require('../lib/helper');

describe("determineAppPath Tests", function() {

  it("returns base path when user inputs valid directory", function() {
    var helper = new Helper({'directories':''});
    path = helper.determineAppPath('webapp/static/script/tests');
    expect(path).toBe('webapp');
  });

  it("returns nothing when invalid string input", function() {
    var helper = new Helper({'directories':''});
    path = helper.determineAppPath('/');
    expect(path).toBe('');
  });

});

describe("determineProjectRoot Tests", function() {

  it("returns project root when node modules found in the path", function() {
    var helper = new Helper({'directories':''});
    project = helper.determineProjectRoot('/Users/foo/project/node_modules/jasmine-phantom-node/lib');
    expect(project).toBe('/Users/foo/project');
  });

  it("returns nothing when node_modules not found in the path", function() {
    var helper = new Helper({'directories':''});
    project = helper.determineProjectRoot('/Users/foo/project/jasmine-phantom-node/lib');
    expect(project).toBe('');
  });

});

describe("addStaticDirectoryForEachSpec Tests", function() {

  var app, appSpy;

  beforeEach(function(){
    app = new Object({'use': function(){}});
    appSpy = spyOn(app, 'use');
  });

  it("invokes determineProjectRoot", function() {
    var helper = new Helper({'directories':['foo']});
    var projectSpy = spyOn(helper, 'determineProjectRoot');
    helper.addStaticDirectoryForEachSpec(app);
    expect(projectSpy).toHaveBeenCalledWith(jasmine.any(String)); //need to verify __dirname
  });

  it("invokes determineAppPath", function() {
    var helper = new Helper({'directories':['foo']});
    var pathSpy = spyOn(helper, 'determineAppPath');
    helper.addStaticDirectoryForEachSpec(app);
    expect(pathSpy).toHaveBeenCalledWith('foo');
  });

  it("invokes determineStaticPath", function() {
    var helper = new Helper({'directories':['foo']});
    var projectSpy = spyOn(helper, 'determineProjectRoot').andReturn('project');
    var pathSpy = spyOn(helper, 'determineAppPath').andReturn('path');
    var staticSpy = spyOn(helper, 'determineStaticPath');
    helper.addStaticDirectoryForEachSpec(app);
    expect(staticSpy).toHaveBeenCalledWith('project', 'path');
  });

  it("invokes app.use with static path", function() {
    var helper = new Helper({'directories':['foo']});
    var staticSpy = spyOn(helper, 'determineStaticPath').andReturn('project/path');
    helper.addStaticDirectoryForEachSpec(app);
    expect(appSpy).toHaveBeenCalledWith('project/path');
  });

});

describe("isFile Tests", function() {

  it("returns true when filename has dot in the name", function() {
    var helper = new Helper({'directories':null});
    expect(helper.isFile('foo.spec.js')).toBe(true);
  });

  it("returns true when filename starts with a dot", function() {
    var helper = new Helper({'directories':null});
    expect(helper.isFile('.DS_Store')).toBe(true);
  });

  it("returns false when filename has no dot in the name", function() {
    var helper = new Helper({'directories':null});
    expect(helper.isFile('models')).toBe(false);
  });

});

describe("isJsSpecFile Tests", function() {

  it("returns true when file is jasmine spec", function() {
    var helper = new Helper({'directories':null});
    expect(helper.isJsSpecFile('foo.spec.js')).toBe(true);
  });

  it("returns false when file is not jasmine spec", function() {
    var helper = new Helper({'directories':null});
    expect(helper.isJsSpecFile('foo.js')).toBe(false);
  });

});
