define(['src/camera', 'src/Pipe'], function(camera, Pipe) {
  var PipeManager = function() {
    this.pipeArgList = [
      [300,0],
      [600,1],
      [900,0],
      [1100,1],
      [1300,0],
      [1700,1],
      [2100,0],
      [2250,1],
      [2400,0]
    ];
    this.pipes = [];
    this.checkNewPipe();
  };

  PipeManager.prototype.update = function() {
    for (var i = 0; i < this.pipes.length; i++) {
      this.pipes[i].update();
    }
    this.checkPipePosition();
    this.checkNewPipe();
  };

  PipeManager.prototype.checkPipePosition = function() {
    if (this.pipes.length === 0) return;
    var firstPipe = this.pipes[0];
    var pos = firstPipe.position;
    if (pos.y < camera.offsetY) {
      firstPipe.remove();
      this.pipes.shift();
    }
  };

  var pipeHeight = Pipe.height;

  PipeManager.prototype.checkNewPipe = function() {
    while(this.pipeArgList.length > 0) {
      var firstArg = this.pipeArgList[0];
      if (firstArg[0] < camera.offsetY + camera.height + pipeHeight) {
        this.pipes.push(new Pipe(firstArg[0], firstArg[1]));
        this.pipeArgList.shift();
      } else {
        break;
      }
    }
  };

  PipeManager.prototype.getColliders = function() {
    var colliders = [];
    for (var i = 0; i < this.pipes.length; i++) {
      colliders.push.apply(colliders, this.pipes[i].getColliders());
    }
    return colliders;
  };

  return PipeManager;
});
