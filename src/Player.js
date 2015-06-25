define(['src/Vector'], function(Vector) {
  var Player = function() {
    var p1 = new Vector(2,3);
    var p2 = new Vector(5,4);
    console.log(Vector.add(p1,p2));
    console.log(p1.multiply(4));
    this.node = $('#player');
    this.position = new Vector();
    this.velocity = new Vector();
    // this.accelaration = new Vector();
  };

  Player.prototype.setPos = function(p) {
    this.node.css({left: p.x, top: p.y});
  };

  Player.prototype.updateVelocity = function(timeDelta) {
    this.velocity.y += 5 * timeDelta;
  };

  Player.prototype.updatePosition = function(timeDelta) {
    this.position.add(Vector.multiply(this.velocity, timeDelta));
    this.setPos(this.position);
  };


  Player.prototype.update = function(timeDelta) {
    this.updateVelocity(timeDelta);
    this.updatePosition(timeDelta);
  };

  return Player;
});
