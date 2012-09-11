require('static/vendor/foo');

describe("even number tests", function() {

  it("2 should be an even number", function() {
    var foo = new Foo();
    even = foo.isEven(2);
    expect(even).toBe(true);
  });

});
