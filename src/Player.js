define(['src/Vector', 'src/Segment', 'src/camera'], function(Vector, Segment, camera) {
  var Player = function(collision) {
    this.node = $('<div id="player" class="player-right">').appendTo($('#game-area'));
    this.position = new Vector(camera.width/2);
    this.velocity = new Vector();
    this.collision = collision;
    this.width = this.node.width();
    this.height = this.node.height();
    this.isDead = false;
    this.isCleared = false;
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

    nextPos.x = Math.max(Math.min(nextPos.x, camera.width-this.width/2), this.width/2);


    if (!this.isDead) {
      var seg = new Segment(this.position, nextPos);
      if (this.collision.check(seg, this.height/3)) {
        // collide with obstacles
        this.isDead = true;
        this.node.attr('class', this.node.attr('class') + '-dead');
        console.log("collide!!!!");
      } else if (this.position.y > nextPos.y &&
                 this.collision.checkGoal(seg, this.height/3)) {
        // goal
        this.isCleared = true;
        console.log("goal!!!!");
        // adjust position
        nextPos = this.collision.getGoalPosition(seg, this.height/3);
      }
    }


    this.position = nextPos;
    this.setPos(nextPos);
  };

  // update (main loop)
  Player.prototype.update = function(timeDelta) {
    if (this.isCleared) return;
    this.updateVelocity(timeDelta);
    this.updatePosition(timeDelta);
  };

  Player.prototype.checkColliders = function() {

  };

  Player.prototype.flapRight = function() {
    if (this.isDead || this.isCleared) return;
    this.velocity = new Vector(200, 350);
    this.node.attr('class', 'player-right');
  };

  Player.prototype.flapLeft = function() {
    if (this.isDead || this.isCleared) return;
    this.velocity = new Vector(-200, 350);
    this.node.attr('class', 'player-left');
  };

  Player.prototype.isPlaying = function() {
    return !(this.isDead || this.isCleared);
  };

  return Player;
});
