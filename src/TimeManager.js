define([], function() {
  var TimeManager = function() {
    this.node = $('<div id="time">').appendTo($('#game-area'));
    this.bestNode = $('<div id="best-time">').appendTo($('#game-area'));
    this.startTime = undefined;
    this.bestTime = localStorage.getItem('bestTime') || 100;
    this.bestNode.text("Best : " + this.bestTime);
    this.record = undefined;
    this.node.text("Time : 0");
  };


  TimeManager.prototype.update = function() {
    if (this.startTime !== undefined) {
      var cur = new Date().getTime();
      var t = (cur - this.startTime) / 1000;
      this.node.text("Time : " + t);
      this.record = t;
    }
  };

  TimeManager.prototype.start = function() {
    this.startTime = new Date().getTime();
  };

  TimeManager.prototype.updateBestTime = function() {
    if (this.record !== undefined && this.record < this.bestTime) {
      localStorage.setItem('bestTime', this.record);
      this.bestNode.text("Best : " + this.record).css('color', 'red');
    }
  };

  return TimeManager;
});
