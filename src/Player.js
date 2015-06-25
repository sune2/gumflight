define(['src/Vector', 'src/scene', 'src/Collision'], function(Vector, scene, Collision) {
  var Player = function(colliders) {
    this.node = $('#player');
    this.position = new Vector();
    this.velocity = new Vector();
    this.collision = new Collision(colliders);
  };

  Player.prototype.setPos = function(p) {
    this.node.css({left: p.x, top: scene.height - p.y});
  };

  Player.prototype.updateVelocity = function(timeDelta) {
    this.velocity.y += -1000 * timeDelta;
  };

  Player.prototype.updatePosition = function(timeDelta) {
    var nextPos = this.position.add(this.velocity.multiply(timeDelta));

    if (nextPos.y < this.node.height()) {
      // collide with ground!! (for debug)
      nextPos.y = this.node.height();
      this.velocity = new Vector();
    }

    if (this.collision.check(this.position, nextPos, 5)) {
      console.log("collide!!!!");
    }
    // this.checkColliders(this.position)

    this.position = nextPos;
    this.setPos(nextPos);
  };

  // update (main loop)
  Player.prototype.update = function(timeDelta) {
    this.updateVelocity(timeDelta);
    this.updatePosition(timeDelta);
  };

  Player.prototype.checkColliders = function() {

  };

  Player.prototype.flapRight = function() {
    this.velocity = new Vector(100, 300);
  };

  Player.prototype.flapLeft = function() {
    this.velocity = new Vector(-100, 300);
  };

  return Player;
});
