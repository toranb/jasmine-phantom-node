require('../lib/recurseDirectory');

describe("isFile Tests", function() {

  it("returns true when filename has dot in the name", function() {
    var sut = new RecurseDirectory();
    expect(sut.isFile('foo.spec.js')).toBe(true);
  });

  it("returns true when filename starts with a dot", function() {
    var sut = new RecurseDirectory();
    expect(sut.isFile('.DS_Store')).toBe(true);
  });

  it("returns false when filename has no dot in the name", function() {
    var sut = new RecurseDirectory();
    expect(sut.isFile('models')).toBe(false);
  });

});
