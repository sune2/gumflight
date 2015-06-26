define(['src/camera', 'src/Pipe'], function(camera, Pipe) {
  var PipeManager = function() {
    var pipes = [new Pipe(200, 0),
                 new Pipe(400, 1)
                ];
    this.pipes = pipes;
  };

  PipeManager.prototype.update = function() {
    for (var i = 0; i < this.pipes.length; i++) {
      this.pipes[i].update();
    }
    this.checkPipePosition();
  };

  PipeManager.prototype.checkPipePosition = function() {
    if (this.pipes.length === 0) return;
    var firstPipe = this.pipes[0];
    var pos = firstPipe.position;
    if (pos.y < camera.offsetY) {
      this.pipes.push(new Pipe(pos.y + 500 + firstPipe.img.height(), firstPipe.type));
      firstPipe.remove();
      this.pipes.shift();
    }
  };

  // maybe too slow
  PipeManager.prototype.getColliders = function() {
    var colliders = [];
    for (var i = 0; i < this.pipes.length; i++) {
      colliders.push.apply(colliders, this.pipes[i].getColliders());
    }
    return colliders;
  };

  return PipeManager;
});
