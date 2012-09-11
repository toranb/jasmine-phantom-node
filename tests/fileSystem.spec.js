require('../lib/fileSystem');

describe("getScriptsForEachJasmineSpec Tests", function() {

  var sut, scripts;

  beforeEach(function(){
    scripts = [];
    sut = new FileSystem({'directories':['foo']});
  });

  it("invokes traverseFileSystem with directory", function() {
    var traverseSpy = spyOn(sut, 'traverseFileSystem').andReturn(['bar']);
    sut.getScriptsForEachJasmineSpec();
    expect(traverseSpy).toHaveBeenCalledWith(scripts, 'foo');
  });

  it("invokes traverseFileSystem once for each directory", function() {
    sut = new FileSystem({'directories':['foo','baz']});
    var traverseSpy = spyOn(sut, 'traverseFileSystem').andReturn(['bar']);
    sut.getScriptsForEachJasmineSpec();
    expect(traverseSpy.callCount).toEqual(2);
  });

  it("returns a string for each script returned from the traverse method in addition to each directory", function() {
    sut = new FileSystem({'directories':['foo','baz']});
    spyOn(sut, "traverseFileSystem").andCallFake(function(scripts, directory) {
      if (directory === 'foo') return ['<one>', '<two>'];
      if (directory === 'baz') return ['<three>', '<four>'];
      return null;
    });
    html = sut.getScriptsForEachJasmineSpec();
    expect(html).toBe("<one><two><three><four>");
  });

});

describe("traverseFileSystemAppendingScripts Tests", function() {

  var sut, scripts;

  beforeEach(function(){
    scripts = [];
    sut = new FileSystem({'directories':null});
  });

  it("returns spec.js file in target directory", function() {
    sut.traverseFileSystemAppendingScripts(scripts, 'file-system/has-spec-example');
    expect(scripts).toEqual(['<script src="/has-spec-example/foo.spec.js"></script>']);
  });

  it("returns empty list when no spec.js file found in target directory", function() {
    sut.traverseFileSystemAppendingScripts(scripts, 'file-system/no-spec-example');
    expect(scripts).toEqual([]);
  });

  it("returns each spec.js file found in both the target directory and each sub directory", function() {
    sut.traverseFileSystemAppendingScripts(scripts, 'file-system/sub-dir-example');
    expect(scripts).toEqual(['<script src="/sub-dir-example/appz.spec.js"></script>',
                            '<script src="/sub-dir-example/controllers/controllerz.spec.js"></script>',
                            '<script src="/sub-dir-example/models/modelz.spec.js"></script>',
                            '<script src="/sub-dir-example/views/templates/finally/lastone.spec.js"></script>',
                            '<script src="/sub-dir-example/views/viewz.spec.js"></script>']
    );
  });

});

describe("traverseFileSystem Tests", function() {

  var sut, scripts;

  beforeEach(function(){
    scripts = [];
    sut = new FileSystem({'directories':null});
  });

  it("invokes traverseFileSystemAppendingScripts with scripts and directory", function() {
    var appendSpy = spyOn(sut, 'traverseFileSystemAppendingScripts');
    sut.traverseFileSystem(scripts, '/foo');
    expect(appendSpy).toHaveBeenCalledWith(scripts, '/foo');
  });

  it("returns scripts after appending from the filesystem", function() {
    var appendSpy = spyOn(sut, 'traverseFileSystemAppendingScripts');
    var result = sut.traverseFileSystem(scripts, '/foo');
    expect(result).toEqual(scripts);
  });

});

describe("getPhantomRunnerHtmlPage Tests", function() {

  it("returns the phantom-runner.html file as a basic string", function() {
    var sut = new FileSystem({'directories':null});
    html = sut.getPhantomRunnerHtmlPage();
    expect(html).toBe("testing123\n");
  });

});

describe("isFile Tests", function() {

  it("returns true when filename has dot in the name", function() {
    var sut = new FileSystem({'directories':null});
    expect(sut.isFile('foo.spec.js')).toBe(true);
  });

  it("returns true when filename starts with a dot", function() {
    var sut = new FileSystem({'directories':null});
    expect(sut.isFile('.DS_Store')).toBe(true);
  });

  it("returns false when filename has no dot in the name", function() {
    var sut = new FileSystem({'directories':null});
    expect(sut.isFile('models')).toBe(false);
  });

});

describe("isJsSpecFile Tests", function() {

  it("returns true when file is jasmine spec", function() {
    var sut = new FileSystem({'directories':null});
    expect(sut.isJsSpecFile('foo.spec.js')).toBe(true);
  });

  it("returns false when file is not jasmine spec", function() {
    var sut = new FileSystem({'directories':null});
    expect(sut.isJsSpecFile('foo.js')).toBe(false);
  });

});
