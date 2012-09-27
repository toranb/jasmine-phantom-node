var colors = require('colors');

ProcessResults = (function() {

  var ProcessResultsObject = function(params) {
    this.debugOn = params.debugOn;
    this.showColor = params.showColor;
  };

  ProcessResultsObject.prototype.logResultsToTheConsole = function(result) {
    var status = this.determineResultsStatus(result);
    this.logResult(result, status);
    this.killProcess(status);
  };

  ProcessResultsObject.prototype.logResult = function(result, status) {
    if (this.showColor) {
      this.logWithColor(result, status);
    }else{
      this.log(result);
    }
  };

  ProcessResultsObject.prototype.killProcess = function(status) {
    if (!this.debugOn) {
      this.exit(status);
    }
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
