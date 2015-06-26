// collision system
define(['src/Segment'], function(Segment) {
  var Collision = function(pipeManager, goal) {
    this.pipeManager = pipeManager;
    this.goal = goal;
  };

  // check collision of the circle with radius `radius` moving from seg.p1 to seg.p2.
  Collision.prototype.check = function(seg, radius) {
    if (seg.getV().magnitude() < 1e-6) return false;
    var colliders = this.pipeManager.getColliders();
    colliders.push.apply(colliders, this.goal.getColliders());
    for (var i = 0; i < colliders.length; i++) {
      if (Segment.distance(seg, colliders[i]) <= radius + 1e-6) {
        return true;
      }
    }
    return false;
  };

  Collision.prototype.checkGoal = function(seg, radius) {
    if (!this.goal.isCreated) {
      return false;
    }
    if (seg.getV().magnitude() < 1e-6) return false;
    var goalSeg = this.goal.getGoalSegment();
    if (Segment.distance(seg, goalSeg) <= radius + 1e-6) {
      return true;
    }
    return false;
  };

  Collision.prototype.getGoalPosition = function(seg, radius) {
    var goalSeg = this.goal.getGoalSegment();
    goalSeg.p1.y += radius;
    goalSeg.p2.y += radius;
    return Segment.crosspoint(seg, goalSeg);
  };

  return Collision;
});
