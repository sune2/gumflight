define(['src/Segment', 'src/Vector', 'src/Pipe'], function(Segment, Vector, Pipe) {
  var Colliders = function() {
    var pipes = [new Pipe(200, 0),
                 new Pipe(400, 1)
                ];
    var colliders = [];
    for (var i = 0; i < pipes.length; ++i) {
      colliders.push.apply(colliders, pipes[i].getColliders());
    }
    this.colliders = colliders;
  };

  return Colliders;
});
