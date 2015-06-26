define([], function() {
  var TimeManager = function() {
    this.node = $('<div id="time">').appendTo($('#game-area'));
    this.startTime = undefined;
  };

  TimeManager.prototype.update = function() {
    if (this.startTime === undefined) {
      this.node.text("Time : 0.000");
    } else {
      var cur = new Date().getTime();
      var t = (cur - this.startTime) / 1000;
      this.node.text("Time : " + t);
    }
  };

  TimeManager.prototype.start = function() {
    this.startTime = new Date().getTime();
  };

  return TimeManager;
});
