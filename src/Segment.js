// segment class
define(['src/Vector'], function(Vector) {
  var Segment = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };

  Segment.prototype.getV = function() {
    return this.p2.subtract(this.p1);
  };


  var differentSide = function(s, p1, p2) {
    var v = s.p2.subtract(s.p1);
    var v1 = p1.subtract(s.p1);
    var v2 = p2.subtract(s.p1);
    return Vector.cross(v, v1) * Vector.cross(v, v2) < 0;
  };

  Segment.intersect = function(s1, s2) {
    return differentSide(s1, s2.p1, s2.p2) && differentSide(s2, s1.p1, s1.p2);
  };

  var projection = function(l, p) {
    var d = Vector.dot(p.subtract(l.p1), l.getV());
    var vv = l.getV().multiply(d / l.getV().sqrMagnitude());
    return l.p1.add(vv);
  };

  var intersectSP = function(s, p) {
    var d1 = s.p1.subtract(p).magnitude() + s.p2.subtract(p).magnitude();
    var d2 = s.getV().magnitude();
    return d1 <= d2 + 1e-6;
  };

  var distanceSP = function(s, p) {
    var r = projection(s, p);
    if (intersectSP(s, r)) {
      return r.subtract(p).magnitude();
    }
    return Math.min(s.p1.subtract(p).magnitude(),
                    s.p2.subtract(p).magnitude());
  };

  Segment.distance = function(s1, s2) {
    if (Segment.intersect(s1, s2)) {
      return 0;
    }
    var m1 = Math.min(distanceSP(s1, s2.p1), distanceSP(s1, s2.p2));
    var m2 = Math.min(distanceSP(s2, s1.p1), distanceSP(s2, s1.p2));
    return Math.min(m1, m2);
  };

  Segment.crosspoint = function(s1, s2) {
    var A = Vector.cross(s1.getV(), s2.getV());
    var B = Vector.cross(s1.getV(), s1.p2.subtract(s2.p1));
    return s2.p1.add(s2.getV().multiply(B/A));
  };

  return Segment;
});
