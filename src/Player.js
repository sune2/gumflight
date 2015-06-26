define(['src/Vector', 'src/camera'], function(Vector, camera) {
  var Player = function(collision) {
    this.node = $('#player');
    this.position = new Vector(camera.width/2);
    this.velocity = new Vector();
    this.collision = collision;
    this.width = this.node.width();
    this.height = this.node.height();
    this.isDead = false;
    // preload images
    $("<img>").attr("src", "img/puyo_right.png");
    $("<img>").attr("src", "img/puyo_left.png");
    $("<img>").attr("src", "img/puyo_right_dead.png");
    $("<img>").attr("src", "img/puyo_left_dead.png");
  };

  Player.prototype.setPos = function(p) {
    var screenPos = camera.worldToScreen(p);
    screenPos = screenPos.subtract(new Vector(this.width/2, this.height/2));
    this.node.css({left: screenPos.x, top: screenPos.y});
  };

  Player.prototype.updateVelocity = function(timeDelta) {
    this.velocity.y += -1000 * timeDelta;
  };

  Player.prototype.updatePosition = function(timeDelta) {
    var nextPos = this.position.add(this.velocity.multiply(timeDelta));

    if (nextPos.y - camera.offsetY < this.height / 2) {
      // collide with ground!! (for debug)
      nextPos.y = this.height/2 + camera.offsetY;
      this.velocity = new Vector();
    }

    // collision with pipes
    if (!this.isDead && this.collision.check(this.position, nextPos, this.height/3)) {
      this.isDead = true;
      this.node.attr('class', this.node.attr('class') + '-dead');
      console.log("collide!!!!");
    }

    this.position = nextPos;
    this.setPos(nextPos);
  };

  // update (main loop)
  Player.prototype.update = function(timeDelta) {
    this.updateVelocity(timeDelta);
    this.updatePosition(timeDelta);

    camera.offsetY = Math.max(camera.offsetY, this.position.y-200);
  };

  Player.prototype.checkColliders = function() {

  };

  Player.prototype.flapRight = function() {
    if (this.isDead) return;
    this.velocity = new Vector(100, 300);
    this.node.attr('class', 'player-right');
  };

  Player.prototype.flapLeft = function() {
    if (this.isDead) return;
    this.velocity = new Vector(-100, 300);
    this.node.attr('class', 'player-left');
  };

  return Player;
});
