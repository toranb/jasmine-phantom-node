var fs = require('fs');
require('../lib/coffee');
require('../lib/recurseDirectory');

describe("compileEachCoffeeSpecFile Tests", function() {

  it("invokes traverseFileSystem with directory", function() {
    var sut = new Coffee({'directories':['foo']});
    var traverseSpy = spyOn(sut, 'traverseFileSystem').andReturn(['bar']);
    sut.compileEachCoffeeSpecFile();
    expect(traverseSpy).toHaveBeenCalledWith('foo');
  });

  it("invokes traverseFileSystem once for each directory", function() {
    var sut = new Coffee({'directories':['foo','baz']});
    var traverseSpy = spyOn(sut, 'traverseFileSystem').andReturn(['bar']);
    sut.compileEachCoffeeSpecFile();
    expect(traverseSpy.callCount).toEqual(2);
  });

});

describe("traverseFileSystemWithCallbacks Tests", function() {

  var sut, recurse, success, retry, compare;

  beforeEach(function(){
    sut = new Coffee({'directories':null});
    recurse = new RecurseDirectory(sut);
    sut.recurse = recurse;
    success = sut.compileToJavaScriptSpec;
    retry = sut.traverseFileSystem;
    compare = sut.isCoffeeFile;
  });

  it("creates a jasmine spec js file from a simple coffee spec", function() {
    var directory = 'file-system/basic-coffee-example';
    var params = {extra:null, directory:directory, success:success, retry:retry, compare:compare};
    recurse.traverseFileSystemWithCallbacks(params);
    var code = fs.readFileSync(directory+'/foo.spec.js', 'utf8');
    expect(code).toContain('expect(1 + 1).toBe(2);');
    fs.unlinkSync(directory+'/foo.spec.js');
  });

  it("creates a jasmine spec js file in each directory and each sub directory containing a coffee spec", function() {
    var directory = 'file-system/sub-dir-coffee';
    var params = {extra:null, directory:directory, success:success, retry:retry, compare:compare};
    recurse.traverseFileSystemWithCallbacks(params);

    var code1 = fs.readFileSync('file-system/sub-dir-coffee/appz.spec.js', 'utf8');
    expect(code1).toContain('expect(1 + 1).toBe(2);');
    fs.unlinkSync('file-system/sub-dir-coffee/appz.spec.js');

    var code2 = fs.readFileSync('file-system/sub-dir-coffee/controllers/controllerz.spec.js', 'utf8');
    expect(code2).toContain('expect(1 + 1).toBe(2);');
    fs.unlinkSync('file-system/sub-dir-coffee/controllers/controllerz.spec.js', 'utf8');

    var code3 = fs.readFileSync('file-system/sub-dir-coffee/models/modelz.spec.js', 'utf8');
    expect(code3).toContain('expect(1 + 1).toBe(2);');
    fs.unlinkSync('file-system/sub-dir-coffee/models/modelz.spec.js', 'utf8');

    var code4 = fs.readFileSync('file-system/sub-dir-coffee/views/viewz.spec.js', 'utf8');
    expect(code4).toContain('expect(1 + 1).toBe(2);');
    fs.unlinkSync('file-system/sub-dir-coffee/views/viewz.spec.js', 'utf8');

    var code5 = fs.readFileSync('file-system/sub-dir-coffee/views/templates/finally/lastone.spec.js', 'utf8');
    expect(code5).toContain('expect(1 + 1).toBe(2);');
    fs.unlinkSync('file-system/sub-dir-coffee/views/templates/finally/lastone.spec.js', 'utf8');
  });

});

describe("traverseFileSystem Tests", function() {

  var sut, recurse, success, retry, compare;

  beforeEach(function(){
    sut = new Coffee({'directories':null});
    recurse = new RecurseDirectory(sut);
    sut.recurse = recurse;
    success = sut.compileToJavaScriptSpec;
    retry = sut.traverseFileSystem;
    compare = sut.isCoffeeFile;
  });

  it("invokes traverseFileSystemWithCallbacks with params", function() {
    var callbackSpy = spyOn(recurse, 'traverseFileSystemWithCallbacks');
    var params = {extra:null, directory:'/foo', success:success, retry:retry, compare:compare};
    sut.traverseFileSystem('/foo');
    expect(callbackSpy).toHaveBeenCalledWith(params);
  });

});

describe("isCoffeeFile Tests", function() {

  it("returns true when file is coffee spec", function() {
    var sut = new Coffee({'directories':null});
    expect(sut.isCoffeeFile('foo.spec.coffee')).toBe(true);
  });

  it("returns false when file is not coffee spec", function() {
    var sut = new Coffee({'directories':null});
    expect(sut.isCoffeeFile('foo.js')).toBe(false);
  });

});
