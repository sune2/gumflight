define(['src/Vector', 'src/scene'], function(Vector, scene) {
  var Player = function() {
    var p1 = new Vector(2,3);
    var p2 = new Vector(5,4);
    console.log(Vector.add(p1,p2));
    console.log(p1.multiply(4));
    this.node = $('#player');
    this.position = new Vector();
    this.velocity = new Vector();
  };

  Player.prototype.setPos = function(p) {
    this.node.css({left: p.x, top: scene.height - p.y});
  };

  Player.prototype.updateVelocity = function(timeDelta) {
    this.velocity.y += -1000 * timeDelta;
  };

  Player.prototype.updatePosition = function(timeDelta) {
    this.position.add(Vector.multiply(this.velocity, timeDelta));

    if (this.position.y < this.node.height()) {
      // collide with ground!! (for debug)
      this.position.y = this.node.height();
      this.velocity = new Vector();
    }
    this.setPos(this.position);
  };

  Player.prototype.update = function(timeDelta) {
    this.updateVelocity(timeDelta);
    this.updatePosition(timeDelta);
  };

  Player.prototype.flapRight = function() {
    this.velocity = new Vector(100, 300);
  };

  Player.prototype.flapLeft = function() {
    this.velocity = new Vector(-100, 300);
  };

  return Player;
});
