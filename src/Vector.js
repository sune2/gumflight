define(function() {
  // constructor
  var Vector = function(x, y) {
    x = x || 0;
    y = y || 0;
    this.x = x;
    this.y = y;
  };

  // instant methods
  Vector.prototype.add = function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  };
  Vector.prototype.subtract = function(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  };
  Vector.prototype.multiply = function(k) {
    this.x *= k;
    this.y *= k;
    return this;
  };

  // static methods
  Vector.add = function(u, v) {
    return new Vector(u.x + v.x, u.y + v.y);
  };
  Vector.subtract = function(u, v) {
    return new Vector(u.x - v.x, u.y - v.y);
  };
  Vector.multiply = function(u, k) {
    return new Vector(u.x * k, u.y * k);
  };
  return Vector;
});
