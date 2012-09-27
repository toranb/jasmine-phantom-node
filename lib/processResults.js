var colors = require('colors');

ProcessResults = (function() {

  var ProcessResultsObject = function(params) {
  };

  ProcessResultsObject.prototype.logResultsToTheConsole = function(result, showColor) {
    var status = this.determineResultsStatus(result);
    if (showColor) {
      this.logWithColor(result, status);
    }else{
      this.log(result);
    }
    this.exit(status);
  };

  ProcessResultsObject.prototype.determineResultsStatus = function(data) {
    if (data.indexOf("All tests passed!") > -1) { return 0; }
    return 1;
  };

  ProcessResultsObject.prototype.logWithColor = function(data, status) {
    if (status === 1) {
      this.log(data.red);
    } else {
      this.log(data.green);
    }
  };

  ProcessResultsObject.prototype.log = function(data) {
    console.log(data);
  };

  ProcessResultsObject.prototype.exit = function(status) {
    process.exit(code=status);
  };

  return ProcessResultsObject;
})();
