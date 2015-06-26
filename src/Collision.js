// collision system
define(['src/Segment'], function(Segment) {
  var Collision = function(pipeManager) {
    this.pipeManager = pipeManager;
  };

  // check collision of the circle with radius `radius` moving from p1 to p2.
  Collision.prototype.check = function(p1, p2, radius) {
    var colliders = this.pipeManager.getColliders();
    var seg = new Segment(p1, p2);
    for (var i = 0; i < colliders.length; i++) {
      if (Segment.distance(seg, colliders[i]) <= radius + 1e-6) {
        return true;
      }
    }
    return false;
  };

  return Collision;
});
