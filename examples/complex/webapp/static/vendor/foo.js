Foo = (function() {

  var FooObject = function() {
  };

  FooObject.prototype.isEven = function(value) {
    if (value%2 == 0) { return true; }

    return false;
  };

  return FooObject;
})();
