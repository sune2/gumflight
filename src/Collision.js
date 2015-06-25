// collision system
define(['src/Segment'], function(Segment) {
  var Collision = function(colliders) {
    this.colliders = colliders; // array of segments
  };

  // check collision of the circle with radius `radius` moving from p1 to p2.
  Collision.prototype.check = function(p1, p2, radius) {
    var seg = new Segment(p1, p2);
    for (var i = 0; i < this.colliders.length; i++) {
      // console.log(Segment.distance(seg, this.colliders[i]));
      if (Segment.distance(seg, this.colliders[i]) <= radius + 1e-6) {
        return true;
      }
    }
    return false;
  };

  return Collision;
});
